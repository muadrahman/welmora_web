
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    AreaChart, Area
} from 'recharts';
import { useIndianCurrency } from '@/hooks/useIndianCurrency';
import { ChevronDown, ArrowRightLeft } from 'lucide-react';
import { solve, calculateEMI, calculateSIPSimulation, calculateSWPSimulation } from '@/utils/financialMath';
import { InputRow, TooltipLabel, CalculatorCard } from '@/components/calculator-ui';
import CalculatorInput from '@/components/CalculatorInput';

const SIP_COLORS = ['#0B2C2C', '#4BB100', '#10B981']; // Trust Teal, Growth Green
const EMI_COLORS = ['#0B2C2C', '#f87171', '#ef4444']; // Trust Teal, Soft Red (Interest)

// --- EMI Solver ---
const EMICalculator = () => {
    const { formatCurrency } = useIndianCurrency();
    const [target, setTarget] = useState<'emi' | 'principal' | 'rate' | 'tenure'>('emi');

    const [principal, setPrincipal] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [emi, setEmi] = useState(21696);

    useEffect(() => {
        setPrincipal(5000000);
        setRate(8.5);
        setTenure(20);
    }, []);

    const [chartData, setChartData] = useState<any[]>([]);
    const [pieData, setPieData] = useState<any[]>([]);
    const [displayResult, setDisplayResult] = useState<{ label: string, value: number, subParams: any }>({ label: '', value: 0, subParams: {} });

    useEffect(() => {
        let calculatedP = principal;
        let calculatedR = rate;
        let calculatedT = tenure;
        let calculatedE = emi;

        if (target === 'emi') {
            calculatedE = calculateEMI(principal, rate, tenure);
        } else if (target === 'principal') {
            const rm = rate / 12 / 100;
            const nm = tenure * 12;
            const factor = rm * (Math.pow(1 + rm, nm) / (Math.pow(1 + rm, nm) - 1));
            calculatedP = emi / factor;
        } else if (target === 'rate') {
            calculatedR = solve(emi, (rGuess) => calculateEMI(principal, rGuess, tenure), 0.1, 50);
        } else if (target === 'tenure') {
            calculatedT = solve(emi, (tGuess) => calculateEMI(principal, rate, tGuess), 1, 50);
        }

        const r_monthly = calculatedR / 12 / 100;
        const n_months = calculatedT * 12;
        let balance = calculatedP;
        let totalInterest = 0;
        const data = [];

        if (calculatedP > 0 && n_months > 0 && n_months < 1200) {
            for (let yr = 0; yr <= Math.ceil(calculatedT); yr++) {
                data.push({ year: yr, balance: Math.max(0, Math.round(balance)), interestPaid: Math.round(totalInterest) });
                for (let m = 0; m < 12; m++) {
                    if (balance <= 0) break;
                    const int = balance * r_monthly;
                    const prin = calculatedE - int;
                    balance -= prin;
                    totalInterest += int;
                }
            }
        }

        setChartData(data);
        const totalPayment = calculatedE * n_months;
        setPieData([
            { name: 'Principal', value: Math.round(calculatedP) },
            { name: 'Interest', value: Math.round(totalInterest) },
        ]);

        let label = '';
        let val = 0;
        switch (target) {
            case 'emi': label = 'Monthly EMI'; val = calculatedE; break;
            case 'principal': label = 'Eligible Loan'; val = calculatedP; break;
            case 'rate': label = 'Max Interest Rate'; val = calculatedR; break;
            case 'tenure': label = 'Loan Tenure'; val = calculatedT; break;
        }
        setDisplayResult({ label, value: val, subParams: { totalInterest, totalPayment } });

    }, [target, principal, rate, tenure, emi]);

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">I want to calculate</label>
                    <select value={target} onChange={(e) => setTarget(e.target.value as any)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-trust-teal focus:ring-2 focus:ring-trust-teal outline-none appearance-none">
                        <option value="emi">Monthly EMI</option>
                        <option value="principal">Loan Amount</option>
                        <option value="rate">Interest Rate</option>
                        <option value="tenure">Loan Tenure</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-8 text-gray-400 pointer-events-none" size={16} />
                </div>

                <div className="space-y-6">
                    {target !== 'principal' && <InputRow label="Loan Amount" val={principal} setVal={setPrincipal} min={100000} max={10000000} step={50000} tooltip="The total principal amount borrowed from the lender." />}
                    {target !== 'rate' && <InputRow label="Interest Rate" val={rate} setVal={setRate} min={1} max={20} step={0.1} unit="%" decimalScale={2} tooltip="The annual percentage rate (APR) charged on the borrowed principal." />}
                    {target !== 'tenure' && <InputRow label="Tenure (Years)" val={tenure} setVal={setTenure} min={1} max={30} step={1} unit="Yr" tooltip="The duration over which the loan is repaid in monthly installments." />}
                    {target !== 'emi' && <InputRow label="Target EMI" val={emi} setVal={setEmi} min={1000} max={200000} step={500} tooltip="The fixed monthly amount you can afford to pay towards loan repayment." />}
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={EMI_COLORS[index % EMI_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Fixed Height to prevent layout shift */}
                <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                            <Area type="monotone" dataKey="interestPaid" stroke="#f87171" fillOpacity={1} fill="url(#colorInterest)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-4">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 text-center">{displayResult.label}</div>
                    <div className="text-3xl font-bold text-trust-teal text-center mb-2 font-mono tracking-tighter" suppressHydrationWarning>
                        {target === 'rate' || target === 'tenure' ? displayResult.value.toFixed(2) : formatCurrency(displayResult.value)}
                        {target === 'rate' && <span className="text-lg text-gray-400 font-sans">%</span>}
                        {target === 'tenure' && <span className="text-lg text-gray-400 font-sans"> Yr</span>}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 border-t pt-2 mt-2">
                        <span>Total Pay: {formatCurrency(displayResult.subParams.totalPayment)}</span>
                        <span className="text-red-500 font-medium">Int: {formatCurrency(displayResult.subParams.totalInterest)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SIP Solver ---
const SIPCalculator = () => {
    const { formatCurrency } = useIndianCurrency();
    const [target, setTarget] = useState<'maturity' | 'sip' | 'lumpsum' | 'rate' | 'tenure'>('maturity');

    const [maturity, setMaturity] = useState(10000000); // 1 Cr
    const [monthlySIP, setMonthlySIP] = useState(15000);
    const [lumpsum, setLumpsum] = useState(0);
    const [rate, setRate] = useState(15);
    const [tenure, setTenure] = useState(15);
    const [stepUp, setStepUp] = useState({ enabled: true, type: 'percentage', value: 15, direction: 'increase', frequency: 'yearly' });

    useEffect(() => {
        setMonthlySIP(15000);
        setRate(15);
        setTenure(15);
        setStepUp({ enabled: true, type: 'percentage', value: 15, direction: 'increase', frequency: 'yearly' });
        setLumpsum(0);
        setMaturity(10000000);
    }, []);

    const [chartData, setChartData] = useState<any[]>([]);
    const [pieData, setPieData] = useState<any[]>([]);
    const [calculatedVal, setCalculatedVal] = useState(0);

    useEffect(() => {
        let calcRes = 0;
        let simData = { maturity: 0, invested: 0, history: [] as any[] };

        if (target === 'maturity') {
            simData = calculateSIPSimulation(monthlySIP, lumpsum, rate, tenure, stepUp);
            calcRes = simData.maturity;
        } else if (target === 'sip') {
            calcRes = solve(maturity, (s) => calculateSIPSimulation(s, lumpsum, rate, tenure, stepUp).maturity, 0, maturity);
            simData = calculateSIPSimulation(calcRes, lumpsum, rate, tenure, stepUp);
        } else if (target === 'lumpsum') {
            calcRes = solve(maturity, (l) => calculateSIPSimulation(monthlySIP, l, rate, tenure, stepUp).maturity, 0, maturity);
            simData = calculateSIPSimulation(monthlySIP, calcRes, rate, tenure, stepUp);
        } else if (target === 'rate') {
            calcRes = solve(maturity, (r) => calculateSIPSimulation(monthlySIP, lumpsum, r, tenure, stepUp).maturity, 0, 100);
            simData = calculateSIPSimulation(monthlySIP, lumpsum, calcRes, tenure, stepUp);
        } else if (target === 'tenure') {
            calcRes = solve(maturity, (t) => calculateSIPSimulation(monthlySIP, lumpsum, rate, t, stepUp).maturity, 0, 100);
            simData = calculateSIPSimulation(monthlySIP, lumpsum, rate, calcRes, stepUp);
        }

        setChartData(simData.history);
        setCalculatedVal(calcRes);
        setPieData([
            { name: 'Invested', value: Math.round(simData.invested) },
            { name: 'Returns', value: Math.round(simData.maturity - simData.invested) },
        ]);

    }, [target, maturity, monthlySIP, lumpsum, rate, tenure, stepUp]);

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">I want to calculate</label>
                    <select value={target} onChange={(e) => setTarget(e.target.value as any)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-trust-teal focus:ring-2 focus:ring-growth-green outline-none appearance-none">
                        <option value="maturity">Final Corpus Amount</option>
                        <option value="sip">Required SIP Amount</option>
                        <option value="lumpsum">Required Lumpsum</option>
                        <option value="rate">Required Return (%)</option>
                        <option value="tenure">Required Time (Years)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-8 text-gray-400 pointer-events-none" size={16} />
                </div>

                <div className="space-y-6">
                    {target !== 'maturity' && <InputRow label="Target Corpus" val={maturity} setVal={setMaturity} min={500000} max={100000000} step={100000} tooltip="The total future value of your investment, including principal and accumulated compound interest." />}
                    {target !== 'sip' && <InputRow label="Monthly SIP" val={monthlySIP} setVal={setMonthlySIP} min={500} max={100000} step={500} tooltip="The fixed amount invested at regular intervals to build wealth via Rupee Cost Averaging." />}
                    {target !== 'lumpsum' && <InputRow label="Lumpsum Deposit" val={lumpsum} setVal={setLumpsum} min={0} max={10000000} step={50000} tooltip="A one-time initial investment that kickstarts compound growth from Day 1." />}
                    <div className="grid grid-cols-2 gap-4">
                        {target !== 'rate' && <div><InputRow label="Return" val={rate} setVal={setRate} min={1} max={30} step={0.1} unit="%" decimalScale={2} tooltip="Expected Compound Annual Growth Rate (CAGR) based on asset class performance." /></div>}
                        {target !== 'tenure' && <div><InputRow label="Years" val={tenure} setVal={setTenure} min={1} max={50} step={1} unit="Yr" tooltip="The investment horizon over which compounding effects accelerate." /></div>}
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-2 max-w-full">
                        <div className="flex items-center gap-1">
                            <TooltipLabel label="Step Up" tooltip="Annual percentage increase in your investment to beat inflation and accelerate wealth creation." />
                            <input type="checkbox" checked={stepUp.enabled} onChange={e => setStepUp({ ...stepUp, enabled: e.target.checked })} className="accent-growth-green ml-1" />
                        </div>
                        {stepUp.enabled && (
                            <div className="flex flex-wrap gap-2 items-center bg-white/50 p-2 rounded-lg border border-gray-100 text-xs text-gray-600 max-w-full overflow-hidden">
                                <select value={stepUp.direction} onChange={e => setStepUp({ ...stepUp, direction: e.target.value })} className="bg-transparent font-bold text-trust-teal outline-none flex-shrink-0">
                                    <option value="increase">Increase</option>
                                    <option value="decrease">Decrease</option>
                                </select>
                                <span className="flex-shrink-0">by</span>
                                <CalculatorInput value={stepUp.value} onChange={v => setStepUp({ ...stepUp, value: v })} className="w-16 border-b text-center font-bold flex-shrink-0" />
                                <div className="flex bg-gray-200 rounded p-0.5 flex-shrink-0">
                                    <button onClick={() => setStepUp({ ...stepUp, type: 'percentage' })} className={`px-2 py-0.5 rounded ${stepUp.type === 'percentage' ? 'bg-white shadow text-trust-teal' : 'text-gray-400'}`}>%</button>
                                    <button onClick={() => setStepUp({ ...stepUp, type: 'amount' })} className={`px-2 py-0.5 rounded ${stepUp.type === 'amount' ? 'bg-white shadow text-trust-teal' : 'text-gray-400'}`}>₹</button>
                                </div>
                                <select value={stepUp.frequency} onChange={e => setStepUp({ ...stepUp, frequency: e.target.value })} className="bg-transparent font-bold text-trust-teal outline-none ml-1 flex-1 min-w-[80px]">
                                    <option value="yearly">Yearly</option>
                                    <option value="half-yearly">Half-Yearly</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SIP_COLORS[index % SIP_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-20 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorSIP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4BB100" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4BB100" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                            <Area type="monotone" dataKey="value" stroke="#4BB100" fillOpacity={1} fill="url(#colorSIP)" strokeWidth={2} />
                            <Area type="monotone" dataKey="benchmark" stroke="#94a3b8" fillOpacity={0} strokeDasharray="3 3" strokeWidth={1} name="FD (6%)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {target === 'maturity' ? 'Final Corpus' : target === 'sip' ? 'Required SIP' : target === 'lumpsum' ? 'Required Lumpsum' : target === 'rate' ? 'Required CAGR' : 'Years Needed'}
                    </div>
                    <div className="text-2xl font-bold text-growth-green font-mono tracking-tighter">
                        {target === 'rate' || target === 'tenure' ? calculatedVal.toFixed(1) : formatCurrency(calculatedVal)}
                        <span className="text-sm text-gray-400 ml-1 font-sans">{target === 'rate' ? '%' : target === 'tenure' ? 'Yrs' : ''}</span>
                    </div>
                </div>
            </div>
            {/* Removed Legacy 10% Button */}
        </div>

    );
};

// --- SWP Solver ---
const SWPCalculator = () => {
    const { formatCurrency } = useIndianCurrency();
    const [target, setTarget] = useState<'withdrawal' | 'corpus' | 'rate' | 'tenure' | 'balance'>('balance');

    const [withdrawal, setWithdrawal] = useState(50000);
    const [corpus, setCorpus] = useState(10000000);
    const [rate, setRate] = useState(8);
    const [tenure, setTenure] = useState(20);
    const [stepUp, setStepUp] = useState({ enabled: true, type: 'percentage' as 'percentage' | 'amount', value: 6, direction: 'increase' as 'increase' | 'decrease', frequency: 'yearly' as 'yearly' | 'monthly' });

    useEffect(() => {
        setCorpus(10000000);
        setWithdrawal(50000);
        setRate(8);
        setTenure(20);
        setStepUp({ enabled: true, type: 'percentage', value: 6, direction: 'increase', frequency: 'yearly' });
    }, []);

    const [chartData, setChartData] = useState<any[]>([]);
    const [pieData, setPieData] = useState<any[]>([]);
    const [calculatedVal, setCalculatedVal] = useState(0);

    useEffect(() => {
        let res = 0;
        let sim = { final: 0, totalW: 0, history: [] as any[] };

        if (target === 'balance') {
            sim = calculateSWPSimulation(corpus, withdrawal, rate, tenure, stepUp);
            res = Math.max(0, sim.final);
        } else if (target === 'withdrawal') {
            res = solve(0, (w) => calculateSWPSimulation(corpus, w, rate, tenure, stepUp).final, 0, corpus);
            sim = calculateSWPSimulation(corpus, res, rate, tenure, stepUp);
        } else if (target === 'corpus') {
            res = solve(0, (c) => calculateSWPSimulation(c, withdrawal, rate, tenure, stepUp).final, 0, withdrawal * 12 * tenure * 2);
            sim = calculateSWPSimulation(res, withdrawal, rate, tenure, stepUp);
        } else if (target === 'rate') {
            res = solve(0, (r) => calculateSWPSimulation(corpus, withdrawal, r, tenure, stepUp).final, 0, 100);
            sim = calculateSWPSimulation(corpus, withdrawal, res, tenure, stepUp);
        } else if (target === 'tenure') {
            res = solve(0, (t) => calculateSWPSimulation(corpus, withdrawal, rate, t, stepUp).final, 0, 100);
            sim = calculateSWPSimulation(corpus, withdrawal, rate, res, stepUp);
        }

        setCalculatedVal(res);
        setChartData(sim.history);
        setPieData([
            { name: 'Remaining', value: Math.round(sim.final) },
            { name: 'Withdrawn', value: Math.round(sim.totalW) },
        ]);

    }, [target, withdrawal, corpus, rate, tenure, stepUp]);

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">I want to calculate</label>
                    <select value={target} onChange={(e) => setTarget(e.target.value as any)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-trust-teal focus:ring-2 focus:ring-growth-green outline-none appearance-none">
                        <option value="balance">Final Balance (Projected)</option>
                        <option value="withdrawal">Sustainable Withdrawal (to 0)</option>
                        <option value="corpus">Required Corpus</option>
                        <option value="rate">Required Return</option>
                        <option value="tenure">Sustainable Years</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-8 text-gray-400 pointer-events-none" size={16} />
                </div>

                <div className="space-y-6">
                    {target !== 'corpus' && <InputRow label="Current Corpus" val={corpus} setVal={setCorpus} min={500000} max={50000000} step={100000} />}
                    {target !== 'withdrawal' && <InputRow label="Monthly Withdrawal" val={withdrawal} setVal={setWithdrawal} min={5000} max={200000} step={1000} />}
                    <div className="grid grid-cols-2 gap-4">
                        {target !== 'rate' && <div><InputRow label="Return" val={rate} setVal={setRate} min={1} max={20} step={0.1} unit="%" decimalScale={2} /></div>}
                        {target !== 'tenure' && <div><InputRow label="Years" val={tenure} setVal={setTenure} min={1} max={50} step={1} unit="Yr" /></div>}
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <TooltipLabel label="Annual Adjustment" tooltip="The percentage or fixed amount by which you plan to increase/decrease your monthly withdrawal to account for inflation or lifestyle changes." />
                            <input type="checkbox" checked={stepUp.enabled} onChange={e => setStepUp({ ...stepUp, enabled: e.target.checked })} className="accent-growth-green ml-1" />
                        </div>
                        {stepUp.enabled && (
                            <div className="flex gap-2 items-center bg-white/50 p-2 rounded-lg border border-gray-100 text-xs text-gray-600">
                                <select value={stepUp.direction} onChange={e => setStepUp({ ...stepUp, direction: e.target.value as any })} className="bg-transparent font-bold text-trust-teal outline-none">
                                    <option value="increase">Increase</option>
                                    <option value="decrease">Decrease</option>
                                </select>
                                <span>by</span>
                                <CalculatorInput value={stepUp.value} onChange={v => setStepUp({ ...stepUp, value: v })} className="w-16 border-b text-center font-bold" />
                                <div className="flex bg-gray-200 rounded p-0.5">
                                    <button onClick={() => setStepUp({ ...stepUp, type: 'percentage' })} className={`px-2 py-0.5 rounded ${stepUp.type === 'percentage' ? 'bg-white shadow text-trust-teal' : 'text-gray-400'}`}>%</button>
                                    <button onClick={() => setStepUp({ ...stepUp, type: 'amount' })} className={`px-2 py-0.5 rounded ${stepUp.type === 'amount' ? 'bg-white shadow text-trust-teal' : 'text-gray-400'}`}>₹</button>
                                </div>
                                <select value={stepUp.frequency} onChange={e => setStepUp({ ...stepUp, frequency: e.target.value as any })} className="bg-transparent font-bold text-trust-teal outline-none ml-1">
                                    <option value="yearly">Yearly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SIP_COLORS[index % SIP_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-20 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorSWP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4BB100" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="gradientHealth" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4BB100" />
                                    <stop offset="100%" stopColor="#ef4444" />
                                </linearGradient>
                            </defs>
                            <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''} />
                            <Area
                                type="monotone"
                                dataKey="balance"
                                stroke={calculatedVal === 0 ? "#ef4444" : "#4BB100"}
                                fillOpacity={1}
                                fill={`url(#${calculatedVal === 0 ? 'gradientHealth' : 'colorSWP'})`}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-xl p-4 text-center">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {target === 'withdrawal' ? 'Sustainable Monthly' : target === 'corpus' ? 'Required Corpus' : target === 'rate' ? 'Required Return' : target === 'balance' ? 'Projected Value' : 'Money Lasts For'}
                    </div>
                    <div className="text-2xl font-bold text-growth-green font-mono tracking-tighter" suppressHydrationWarning>
                        {target === 'rate' || target === 'tenure' ? calculatedVal.toFixed(1) : formatCurrency(calculatedVal)}
                        <span className="text-sm text-gray-400 ml-1 font-sans">{target === 'rate' ? '%' : target === 'tenure' ? 'Yrs' : ''}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CalculatorsPage() {
    return (
        <div className="min-h-screen bg-white p-6 md:p-8 pt-24 font-sans text-slate-800" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto space-y-12">

                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-trust-teal to-growth-green tracking-tight">Financial Calculators</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Precision engineering for your wealth. Plan loans, investments, and withdrawals with our professional-grade suite.
                    </p>

                    {/* Comparison - DESKTOP ONLY */}
                    <div className="hidden lg:flex justify-center pt-4">
                        <Link href="/calculators/compare" className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 hover:border-trust-teal rounded-full shadow-sm hover:shadow-md transition-all text-trust-teal font-bold group">
                            <span>Compare Scenarios</span>
                            <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group/card h-full">
                        <CalculatorCard title="EMI Solver" description="Loan optimization & interest analysis.">
                            <EMICalculator />
                        </CalculatorCard>
                    </div>
                    <div className="group/card h-full">
                        <CalculatorCard title="SIP Solver" description="Wealth accumulation & Step-Up planning.">
                            <SIPCalculator />
                        </CalculatorCard>
                    </div>
                    <div className="group/card h-full">
                        <CalculatorCard title="SWP Solver" description="Retirement income & depletion analysis.">
                            <SWPCalculator />
                        </CalculatorCard>
                    </div>
                </div>
            </div>
        </div>
    );
};
