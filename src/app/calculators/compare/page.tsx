
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ArrowRightLeft } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useIndianCurrency } from '@/hooks/useIndianCurrency';
import { calculateEMI, calculateEMISchedule, calculateSIPSimulation, calculateSWPSimulation, solve } from '@/utils/financialMath';
import { InputRow, TooltipLabel, CalculatorCard } from '@/components/calculator-ui';
import CalculatorInput from '@/components/CalculatorInput';

const COMPARISON_COLORS = {
    A: '#0B2C2C', // Trust Teal
    B: '#4BB100', // Growth Green
};

type Scenario = {
    amount: number; // SIP / Loan / Corpus
    extra: number;  // Lumpsum / EMI(Target) / Withdrawal
    rate: number;
    tenure: number;
    stepUp: number;
    target: number; // Maturity / TotalInterest(Output) / Balance
};

export default function ComparisonPage() {
    const { formatCurrency } = useIndianCurrency();
    const [tool, setTool] = useState<'SIP' | 'EMI' | 'SWP'>('SIP');
    const [goal, setGoal] = useState<string>('maturity'); // Common key for dynamic goals

    // Dynamic Options based on Tool
    const getGoalOptions = () => {
        switch (tool) {
            case 'SIP': return [
                { id: 'maturity', label: 'Final Corpus' },
                { id: 'sip', label: 'Required SIP' },
                { id: 'tenure', label: 'Required Time' }
            ];
            case 'EMI': return [
                { id: 'emi', label: 'Monthly EMI' },
                { id: 'amount', label: 'Max Loan Amount' }
            ];
            case 'SWP': return [
                { id: 'balance', label: 'Final Balance' },
                { id: 'withdrawal', label: 'Sustainable Withdrawal' },
                { id: 'corpus', label: 'Required Corpus' }
            ];
            default: return [];
        }
    };

    // Default States
    const defaultState: Scenario = {
        amount: 15000,
        extra: 0,
        rate: 15,
        tenure: 15,
        stepUp: 0,
        target: 10000000
    };

    const [scA, setScA] = useState<Scenario>(defaultState);
    const [scB, setScB] = useState<Scenario>({ ...defaultState, rate: 12 });

    // Reset logic when tool changes
    useEffect(() => {
        setGoal(getGoalOptions()[0].id);
        if (tool === 'SIP') {
            const def: Scenario = { amount: 15000, extra: 0, rate: 15, tenure: 15, stepUp: 0, target: 10000000 };
            setScA(def);
            setScB({ ...def, rate: 12 });
        } else if (tool === 'EMI') {
            const def: Scenario = { amount: 5000000, extra: 45000, rate: 8.5, tenure: 20, stepUp: 0, target: 0 };
            setScA(def);
            setScB({ ...def, rate: 9.0 });
        } else if (tool === 'SWP') {
            const def: Scenario = { amount: 10000000, extra: 50000, rate: 8, tenure: 20, stepUp: 0, target: 0 };
            setScA(def);
            setScB({ ...def, extra: 60000 }); // Compare distinct withdrawals
        }
    }, [tool]);

    const [chartData, setChartData] = useState<any[]>([]);
    const [resultA, setResultA] = useState(0);
    const [resultB, setResultB] = useState(0);

    // Core Calculation Engine
    useEffect(() => {
        let data: any[] = [];
        let finalA = 0, finalB = 0;

        const runSolver = (s: Scenario): { res: number, history: any[] } => {
            const stepUpObj = { enabled: s.stepUp > 0, type: 'percentage', value: s.stepUp, direction: 'increase', frequency: 'yearly' };

            if (tool === 'SIP') {
                if (goal === 'maturity') {
                    const sim = calculateSIPSimulation(s.amount, s.extra, s.rate, s.tenure, stepUpObj);
                    return { res: sim.maturity, history: sim.history.map(h => ({ year: h.year, val: h.value })) };
                }
                else if (goal === 'sip') {
                    const reqSIP = solve(s.target, (sip) => calculateSIPSimulation(sip, s.extra, s.rate, s.tenure, stepUpObj).maturity, 0, s.target);
                    const sim = calculateSIPSimulation(reqSIP, s.extra, s.rate, s.tenure, stepUpObj);
                    return { res: reqSIP, history: sim.history.map(h => ({ year: h.year, val: h.value })) };
                }
                else if (goal === 'tenure') {
                    const reqT = solve(s.target, (t) => calculateSIPSimulation(s.amount, s.extra, s.rate, t, stepUpObj).maturity, 0, 100);
                    // For visualization of tenure diff, we might just show standard curve up to max tenure?
                    // Or show curve up to calculated tenure?
                    const sim = calculateSIPSimulation(s.amount, s.extra, s.rate, reqT, stepUpObj);
                    return { res: reqT, history: sim.history.map(h => ({ year: h.year, val: h.value })) };
                }
            }
            else if (tool === 'EMI') {
                if (goal === 'emi') {
                    const res = calculateEMI(s.amount, s.rate, s.tenure);
                    const sched = calculateEMISchedule(s.amount, s.rate, s.tenure, res);
                    return { res: res, history: sched.history.map(h => ({ year: h.year, val: h.balance })) };
                }
                else if (goal === 'amount') { // Max Loan
                    // s.extra used as Target EMI here
                    const reqLoan = solve(s.extra, (p) => calculateEMI(p, s.rate, s.tenure), 10000, s.extra * 12 * 30);
                    const sched = calculateEMISchedule(reqLoan, s.rate, s.tenure, s.extra);
                    return { res: reqLoan, history: sched.history.map(h => ({ year: h.year, val: h.balance })) };
                }
            }
            else if (tool === 'SWP') {
                if (goal === 'balance') {
                    const sim = calculateSWPSimulation(s.amount, s.extra, s.rate, s.tenure, stepUpObj);
                    return { res: sim.final, history: sim.history.map(h => ({ year: h.year, val: h.balance })) };
                }
                else if (goal === 'withdrawal') {
                    // Solve for withdrawal that leaves 0 balance (or specific target?)
                    // Usually "Sustainable Withdrawl" implies 0 balance at end.
                    const reqW = solve(0, (w) => calculateSWPSimulation(s.amount, w, s.rate, s.tenure, stepUpObj).final, 0, s.amount);
                    const sim = calculateSWPSimulation(s.amount, reqW, s.rate, s.tenure, stepUpObj);
                    return { res: reqW, history: sim.history.map(h => ({ year: h.year, val: h.balance })) };
                }
                else if (goal === 'corpus') {
                    // Solve for Corpus needed
                    const reqC = solve(0, (c) => calculateSWPSimulation(c, s.extra, s.rate, s.tenure, stepUpObj).final, 0, s.extra * 12 * s.tenure * 2);
                    const sim = calculateSWPSimulation(reqC, s.extra, s.rate, s.tenure, stepUpObj);
                    return { res: reqC, history: sim.history.map(h => ({ year: h.year, val: h.balance })) };
                }
            }

            return { res: 0, history: [] };
        };

        const resA = runSolver(scA);
        const resB = runSolver(scB);

        finalA = resA.res;
        finalB = resB.res;

        // Merge History safely
        const maxLen = Math.max(resA.history.length, resB.history.length);
        const merged = [];
        for (let i = 0; i < maxLen; i++) {
            merged.push({
                year: resA.history[i]?.year ?? resB.history[i]?.year ?? i,
                valA: resA.history[i]?.val ?? 0,
                valB: resB.history[i]?.val ?? 0,
            });
        }

        setChartData(merged);
        setResultA(finalA);
        setResultB(finalB);

    }, [scA, scB, tool, goal]);

    const InputSection = ({ isA }: { isA: boolean }) => {
        const s = isA ? scA : scB;
        const setVal = (field: keyof Scenario, val: number) => {
            if (isA) setScA(prev => ({ ...prev, [field]: val }));
            else setScB(prev => ({ ...prev, [field]: val }));
        }
        const color = isA ? 'text-[#0B2C2C]' : 'text-[#4BB100]';

        return (
            <div className={`space-y-6`}>
                <h3 className={`font-bold text-lg border-b pb-2 ${color} flex justify-between`}>
                    <span>Scenario {isA ? 'A' : 'B'}</span>
                    <span className="text-xs font-normal text-gray-400 self-center">
                        {isA ? '(Primary)' : '(Comparison)'}
                    </span>
                </h3>

                {/* SIP Inputs */}
                {tool === 'SIP' && (
                    <>
                        {goal !== 'sip' && <InputRow label="Monthly SIP" val={s.amount} setVal={(v: number) => setVal('amount', v)} min={500} max={100000} step={500} />}
                        {goal !== 'maturity' && <InputRow label="Target Corpus" val={s.target} setVal={(v: number) => setVal('target', v)} min={500000} max={100000000} step={100000} />}
                        <InputRow label="Lumpsum" val={s.extra} setVal={(v: number) => setVal('extra', v)} min={0} max={10000000} step={50000} />
                    </>
                )}

                {/* EMI Inputs */}
                {tool === 'EMI' && (
                    <>
                        {goal !== 'amount' && <InputRow label="Loan Amount" val={s.amount} setVal={(v: number) => setVal('amount', v)} min={100000} max={10000000} step={50000} />}
                        {goal !== 'emi' && <InputRow label="Target EMI" val={s.extra} setVal={(v: number) => setVal('extra', v)} min={1000} max={200000} step={500} />}
                    </>
                )}

                {/* SWP Inputs */}
                {tool === 'SWP' && (
                    <>
                        {goal !== 'corpus' && <InputRow label="Corpus" val={s.amount} setVal={(v: number) => setVal('amount', v)} min={500000} max={50000000} step={100000} />}
                        {goal !== 'withdrawal' && <InputRow label="Monthly Withdrawal" val={s.extra} setVal={(v: number) => setVal('extra', v)} min={5000} max={200000} step={1000} />}
                    </>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <InputRow label="Return %" val={s.rate} setVal={(v: number) => setVal('rate', v)} min={1} max={30} step={0.1} unit="%" decimalScale={2} />
                    {goal !== 'tenure' && <InputRow label="Years" val={s.tenure} setVal={(v: number) => setVal('tenure', v)} min={1} max={50} step={1} unit="Yr" />}
                </div>

                {tool !== 'EMI' && (
                    <InputRow label="Step Up %" val={s.stepUp} setVal={(v: number) => setVal('stepUp', v)} min={0} max={20} step={1} unit="%" />
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 pt-24 font-sans text-slate-800" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link href="/calculators" className="flex items-center gap-2 text-trust-teal font-semibold hover:text-growth-green transition-colors">
                        <ChevronLeft size={20} />
                        Return to Hub
                    </Link>

                    <div className="flex gap-4">
                        <div className="relative z-20">
                            <select
                                value={tool}
                                onChange={(e) => setTool(e.target.value as any)}
                                className="bg-white border-2 border-trust-teal text-trust-teal font-bold text-lg px-6 py-2 rounded-full outline-none focus:ring-4 focus:ring-trust-teal/10 appearance-none pr-12 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                            >
                                <option value="SIP">SIP Solver</option>
                                <option value="EMI">EMI Solver</option>
                                <option value="SWP">SWP Solver</option>
                            </select>
                            <ArrowRightLeft className="absolute right-4 top-1/2 -translate-y-1/2 text-trust-teal pointer-events-none" size={20} />
                        </div>

                        <div className="relative z-20">
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)}
                                className="bg-growth-green/10 border-2 border-growth-green text-growth-green font-bold text-lg px-6 py-2 rounded-full outline-none focus:ring-4 focus:ring-growth-green/10 appearance-none pr-12 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                            >
                                {getGoalOptions().map(opt => (
                                    <option key={opt.id} value={opt.id}>Find: {opt.label}</option>
                                ))}
                            </select>
                            <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 text-growth-green pointer-events-none rotate-270" size={20} style={{ transform: 'rotate(-90deg)' }} />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel: Inputs A */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 h-fit">
                        <InputSection isA={true} />
                    </div>

                    {/* Center: Chart & Delta */}
                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex-1 min-h-[400px] flex flex-col">
                            <h3 className="text-center text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">
                                {goal === 'tenure' ? 'Projected Growth (Fixed Horizon)' : 'Growth Comparison'}
                            </h3>
                            <div className="flex-1 w-full min-h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={COMPARISON_COLORS.A} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={COMPARISON_COLORS.A} stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={COMPARISON_COLORS.B} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={COMPARISON_COLORS.B} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(v) => `${(v / 100000).toFixed(0)}L`} />
                                        <Tooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="valA" stroke={COMPARISON_COLORS.A} strokeWidth={3} fill="url(#gradA)" name="Scenario A" />
                                        <Area type="monotone" dataKey="valB" stroke={COMPARISON_COLORS.B} strokeWidth={3} strokeDasharray="4 4" fill="url(#gradB)" name="Scenario B" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Delta Panel */}
                        <div className="bg-trust-teal text-white rounded-2xl p-6 shadow-2xl flex justify-between items-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-growth-green opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>

                            <div className="text-center flex-1 border-r border-white/20">
                                <div className="text-xs opacity-60 uppercase tracking-wider mb-1">Scenario A Result</div>
                                <div className="text-2xl font-mono font-bold">
                                    {goal === 'tenure' ? resultA.toFixed(1) + ' Years' : formatCurrency(resultA)}
                                </div>
                            </div>

                            <div className="px-6 text-center animate-in zoom-in duration-500">
                                <span className="block text-xs uppercase opacity-60 mb-1">Difference</span>
                                <span className="text-3xl font-bold text-growth-green tracking-tighter">
                                    {goal === 'tenure' ? Math.abs(resultA - resultB).toFixed(1) + ' Yrs' : formatCurrency(Math.abs(resultA - resultB))}
                                </span>
                            </div>

                            <div className="text-center flex-1 border-l border-white/20">
                                <div className="text-xs opacity-60 uppercase tracking-wider mb-1">Scenario B Result</div>
                                <div className="text-2xl font-mono font-bold text-growth-green">
                                    {goal === 'tenure' ? resultB.toFixed(1) + ' Years' : formatCurrency(resultB)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Inputs B */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-6 shadow-xl border-2 border-growth-green/20 h-fit">
                        <InputSection isA={false} />
                    </div>

                </div>
            </div>
        </div>
    );
};
