'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
    AreaChart, Area, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useIndianCurrency } from '@/hooks/useIndianCurrency';
import CalculatorInput from '@/components/CalculatorInput';
import { Info, HelpCircle } from 'lucide-react';

const SIP_COLORS = ['#0B2C2C', '#4BB100', '#10B981']; // Trust Teal, Growth Green
const EMI_COLORS = ['#0B2C2C', '#f87171', '#ef4444']; // Trust Teal, Soft Red (Interest)

interface CalculatorCardProps {
    title: string;
    children: React.ReactNode;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-trust-teal/20 rounded-2xl p-6 shadow-xl flex flex-col gap-6 h-full">
            <h2 className="text-2xl font-bold text-trust-teal">{title}</h2>
            {children}
        </div>
    );
};

// --- Helper Components ---
const TooltipLabel = ({ label, tooltip }: { label: string, tooltip: string }) => (
    <div className="flex items-center gap-1 mb-2">
        <label className="text-sm font-medium text-trust-teal">{label}</label>
        <div className="group relative">
            <HelpCircle size={14} className="text-gray-400 cursor-help" />
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-xs p-2 rounded w-48 hidden group-hover:block z-10 pointer-events-none shadow-lg">
                {tooltip}
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
            </div>
        </div>
    </div>
);

// --- SIP Calculator (Advanced) ---
const SIPCalculator = () => {
    const { formatCurrency } = useIndianCurrency();
    const [goal, setGoal] = useState<'maturity' | 'target'>('maturity');

    // Params
    const [lumpsum, setLumpsum] = useState(0);
    const [monthlySIP, setMonthlySIP] = useState(5000);
    const [rate, setRate] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10); // Years
    const [frequency, setFrequency] = useState<'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'>('Monthly');

    // Step-Up
    const [stepUpEnabled, setStepUpEnabled] = useState(false);
    const [stepUpType, setStepUpType] = useState<'amount' | 'percentage'>('percentage');
    const [stepUpValue, setStepUpValue] = useState(10); // 10% or 1000 Rs

    // Results
    const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        // Simulation Engine
        let currentSIP = monthlySIP;
        let totalInvested = lumpsum;
        let currentBalance = lumpsum;
        let monthsElapsed = 0;

        const r_monthly = rate / 100 / 12;
        const totalMonths = timePeriod * 12;

        // Frequency mapping (months per installment)
        const freqMap = { 'Monthly': 1, 'Quarterly': 3, 'Semi-Annually': 6, 'Annually': 12 };
        const freqMonths = freqMap[frequency];

        const dataPoints = [];

        // Add initial point
        dataPoints.push({ year: 0, invested: totalInvested, value: currentBalance });

        for (let m = 1; m <= totalMonths; m++) {
            // Apply Step-Up (Annually)
            if (stepUpEnabled && m > 1 && (m - 1) % 12 === 0) {
                if (stepUpType === 'percentage') {
                    currentSIP = currentSIP * (1 + stepUpValue / 100);
                } else {
                    currentSIP = currentSIP + stepUpValue;
                }
            }

            // Apply Investment according to Frequency
            if ((m - 1) % freqMonths === 0) {
                // For non-monthly frequency, we assume the SIP amount is the *installment* amount?
                // Usually SIP implies "Monthly", but if frequency is Quarterly, is "5000" paid every quarter? Yes.
                totalInvested += currentSIP;
                currentBalance += currentSIP;
            }

            // Apply Monthly Growth
            currentBalance = currentBalance * (1 + r_monthly);

            // Record Annual Data
            if (m % 12 === 0) {
                dataPoints.push({
                    year: m / 12,
                    invested: Math.round(totalInvested),
                    value: Math.round(currentBalance)
                });
            }
        }

        setResult({
            invested: Math.round(totalInvested),
            returns: Math.round(currentBalance - totalInvested),
            total: Math.round(currentBalance)
        });
        setChartData(dataPoints);

    }, [lumpsum, monthlySIP, rate, timePeriod, frequency, stepUpEnabled, stepUpType, stepUpValue]);

    const pieData = [
        { name: 'Invested', value: result.invested },
        { name: 'Returns', value: result.returns },
    ];

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                {/* Inputs */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                        onClick={() => setGoal('maturity')}
                        className={`text-sm font-bold py-2 rounded-lg border transition-all ${goal === 'maturity' ? 'bg-growth-green text-white border-growth-green' : 'bg-transparent text-gray-500 border-gray-200'}`}
                    >
                        Maturity Value
                    </button>
                    <button
                        onClick={() => setGoal('target')}
                        className={`text-sm font-bold py-2 rounded-lg border transition-all ${goal === 'target' ? 'bg-growth-green text-white border-growth-green' : 'bg-transparent text-gray-500 border-gray-200'}`}
                    >
                        Target SIP
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Lumpsum */}
                    <div>
                        <TooltipLabel label="Lumpsum Deposit" tooltip="One-time initial investment." />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">₹</span>
                            <CalculatorInput value={lumpsum} onChange={setLumpsum} className="w-full" />
                        </div>
                    </div>

                    {/* SIP Amount */}
                    <div>
                        <TooltipLabel label="Regular Installment" tooltip="Amount invested periodically." />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">₹</span>
                            <CalculatorInput value={monthlySIP} onChange={setMonthlySIP} className="w-full" />
                        </div>
                        <input type="range" min="500" max="100000" step="500" value={monthlySIP} onChange={e => setMonthlySIP(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-growth-green mt-2" />
                    </div>

                    {/* Frequency */}
                    <div>
                        <TooltipLabel label="Frequency" tooltip="How often you invest." />
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as any)}
                            className="w-full p-2 border rounded bg-white/50 font-medium text-trust-teal text-sm focus:ring-1 focus:ring-growth-green"
                        >
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Semi-Annually</option>
                            <option>Annually</option>
                        </select>
                    </div>

                    {/* Rate & Tenure */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <TooltipLabel label="Return (%)" tooltip="Expected annual rate of return." />
                            <CalculatorInput value={rate} onChange={setRate} className="w-full" />
                        </div>
                        <div>
                            <TooltipLabel label="Years" tooltip="Investment duration." />
                            <CalculatorInput value={timePeriod} onChange={setTimePeriod} className="w-full" />
                        </div>
                    </div>

                    {/* Step Up Toggle */}
                    <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-trust-teal flex items-center gap-1">
                                Annual Step-Up
                                <input type="checkbox" checked={stepUpEnabled} onChange={(e) => setStepUpEnabled(e.target.checked)} className="accent-growth-green" />
                            </label>
                        </div>
                        {stepUpEnabled && (
                            <div className="flex gap-2">
                                <select
                                    value={stepUpType}
                                    onChange={(e) => setStepUpType(e.target.value as any)}
                                    className="p-1 text-sm border rounded bg-white/50"
                                >
                                    <option value="percentage">%</option>
                                    <option value="amount">₹</option>
                                </select>
                                <CalculatorInput value={stepUpValue} onChange={setStepUpValue} className="w-full" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Visuals */}
            <div className="flex flex-col gap-4">
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SIP_COLORS[index % SIP_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorSIP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4BB100" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4BB100" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="value" stroke="#4BB100" fillOpacity={1} fill="url(#colorSIP)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/40 rounded-xl p-4 text-center">
                    <div className="text-sm text-gray-600">Total Value</div>
                    <div className="text-2xl font-bold text-trust-teal">{formatCurrency(result.total)}</div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
                        <span>Inv: {formatCurrency(result.invested)}</span>
                        <span className="text-growth-green">Ret: {formatCurrency(result.returns)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- EMI Calculator (Refined) ---
const EMICalculator = () => {
    const { formatCurrency } = useIndianCurrency();
    const [goal, setGoal] = useState<'emi' | 'eligibility'>('emi');

    const [loanAmount, setLoanAmount] = useState(2500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20); // Years

    const [result, setResult] = useState({ emi: 0, totalInterest: 0, totalPayment: 0, maxLoan: 0 });
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        const r = rate / 12 / 100;
        const n = tenure * 12;

        if (goal === 'emi') {
            const emi = loanAmount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
            const totalPayment = emi * n;
            setResult({
                emi: Math.round(emi),
                totalInterest: Math.round(totalPayment - loanAmount),
                totalPayment: Math.round(totalPayment),
                maxLoan: 0
            });

            // Chart Data
            let balance = loanAmount;
            let interestAcc = 0;
            const data = [];
            for (let yr = 0; yr <= tenure; yr++) {
                data.push({ year: yr, balance: Math.round(balance), interestValues: Math.round(interestAcc) });
                for (let m = 0; m < 12; m++) {
                    if (balance <= 0) break;
                    const interest = balance * r;
                    const principal = emi - interest;
                    balance -= principal;
                    interestAcc += interest;
                }
            }
            setChartData(data);

        } else {
            // Eligibility: input "loanAmount" acts as "Affordable EMI" in this mode for simplicity? 
            // Better to genericize state names, but for now let's reuse 'loanAmount' state as valid input variable 
            // Or rename it in UI context.
            // Let's assume 'loanAmount' state holds the EMI input when mode is 'eligibility'.
            const affordableEMI = loanAmount; // Reusing state variable
            const maxLoan = affordableEMI / (r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)));
            const totalPayment = affordableEMI * n;
            setResult({
                emi: affordableEMI,
                totalInterest: Math.round(totalPayment - maxLoan),
                totalPayment: Math.round(totalPayment),
                maxLoan: Math.round(maxLoan)
            });
            setChartData([]); // Simplified for eligibility
        }
    }, [loanAmount, rate, tenure, goal]);

    const pieData = [
        { name: 'Principal', value: goal === 'emi' ? loanAmount : result.maxLoan },
        { name: 'Interest', value: result.totalInterest },
    ];

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <button onClick={() => setGoal('emi')} className={`text-sm font-bold py-2 rounded-lg border transition-all ${goal === 'emi' ? 'bg-trust-teal text-white border-trust-teal' : 'bg-transparent text-gray-500 border-gray-200'}`}>Monthly EMI</button>
                    <button onClick={() => setGoal('eligibility')} className={`text-sm font-bold py-2 rounded-lg border transition-all ${goal === 'eligibility' ? 'bg-trust-teal text-white border-trust-teal' : 'bg-transparent text-gray-500 border-gray-200'}`}>Eligibility</button>
                </div>

                <div className="space-y-4">
                    <div>
                        <TooltipLabel label={goal === 'emi' ? "Loan Amount" : "Affordable Monthly EMI"} tooltip={goal === 'emi' ? "Total principal amount." : "How much can you pay monthly?"} />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">₹</span>
                            <CalculatorInput value={loanAmount} onChange={setLoanAmount} className="w-full" />
                        </div>
                        <input type="range" min="10000" max={goal === 'emi' ? 10000000 : 200000} step="1000" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-trust-teal mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <TooltipLabel label="Rate (%)" tooltip="Annual Interest Rate." />
                            <CalculatorInput value={rate} onChange={setRate} className="w-full" />
                        </div>
                        <div>
                            <TooltipLabel label="Tenure (Yr)" tooltip="Loan duration." />
                            <CalculatorInput value={tenure} onChange={setTenure} className="w-full" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visuals */}
            <div className="flex flex-col gap-4">
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={EMI_COLORS[index % EMI_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {goal === 'emi' && (
                    <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorEMI" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Area type="monotone" dataKey="brand" dataKey="interestValues" stroke="#f87171" fillOpacity={1} fill="url(#colorEMI)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                )}

                <div className="bg-white/40 rounded-xl p-4 text-center">
                    <div className="text-sm text-gray-600">{goal === 'emi' ? 'Monthly EMI' : 'Eligible Loan'}</div>
                    <div className="text-2xl font-bold text-trust-teal">
                        {formatCurrency(goal === 'emi' ? result.emi : result.maxLoan)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SWP Calculator (Advanced) ---
const SWPCalculator = () => {
    const { formatCurrency } = useIndianCurrency();

    // Params
    const [corpus, setCorpus] = useState(5000000);
    const [withdrawal, setWithdrawal] = useState(25000);
    const [rate, setRate] = useState(8);
    const [duration, setDuration] = useState(10);
    const [frequency, setFrequency] = useState<'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'>('Monthly');

    // Inflation
    const [inflationEnabled, setInflationEnabled] = useState(false);
    const [inflationRate, setInflationRate] = useState(6); // %

    // Results
    const [finalValue, setFinalValue] = useState(0);
    const [totalWithdrawn, setTotalWithdrawn] = useState(0);
    const [chartData, setChartData] = useState<any[]>([]);

    useEffect(() => {
        let currentBalance = corpus;
        let currentWithdrawal = withdrawal;
        let totalW = 0;

        const r_monthly = rate / 100 / 12;
        const totalMonths = duration * 12;
        const freqMap = { 'Monthly': 1, 'Quarterly': 3, 'Semi-Annually': 6, 'Annually': 12 };
        const freqMonths = freqMap[frequency];

        const dataPoints = [];
        dataPoints.push({ year: 0, balance: Math.round(currentBalance) });

        for (let m = 1; m <= totalMonths; m++) {
            // Apply Annual Inflation to Withdrawal
            if (inflationEnabled && m > 1 && (m - 1) % 12 === 0) {
                currentWithdrawal = currentWithdrawal * (1 + inflationRate / 100);
            }

            // Apply Growth
            currentBalance = currentBalance * (1 + r_monthly);

            // Apply Withdrawal
            if ((m - 1) % freqMonths === 0) {
                currentBalance -= currentWithdrawal;
                totalW += currentWithdrawal;
            }

            if (currentBalance < 0) currentBalance = 0;

            if (m % 12 === 0) {
                dataPoints.push({ year: m / 12, balance: Math.round(currentBalance) });
            }
        }

        setFinalValue(Math.round(currentBalance));
        setTotalWithdrawn(Math.round(totalW));
        setChartData(dataPoints);

    }, [corpus, withdrawal, rate, duration, frequency, inflationEnabled, inflationRate]);

    const pieData = [
        { name: 'Final', value: finalValue },
        { name: 'Withdrawn', value: totalWithdrawn },
    ];

    return (
        <div className="flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-4">
                <div className="text-center font-bold text-trust-teal border-b pb-2">Retirement Plan</div>

                <div className="space-y-4">
                    <div>
                        <TooltipLabel label="Total Corpus" tooltip="Your retirement savings." />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">₹</span>
                            <CalculatorInput value={corpus} onChange={setCorpus} className="w-full" />
                        </div>
                    </div>

                    <div>
                        <TooltipLabel label="Withdrawal" tooltip="Periodic income needed." />
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">₹</span>
                            <CalculatorInput value={withdrawal} onChange={setWithdrawal} className="w-full" />
                        </div>
                        <input type="range" min="1000" max="100000" step="500" value={withdrawal} onChange={e => setWithdrawal(Number(e.target.value))} className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-growth-green mt-2" />
                    </div>

                    {/* Frequency */}
                    <div>
                        <TooltipLabel label="Frequency" tooltip="How often you withdraw." />
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as any)}
                            className="w-full p-2 border rounded bg-white/50 font-medium text-trust-teal text-sm focus:ring-1 focus:ring-growth-green"
                        >
                            <option>Monthly</option>
                            <option>Quarterly</option>
                            <option>Semi-Annually</option>
                            <option>Annually</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <TooltipLabel label="Rate (%)" tooltip="Expected annual return." />
                            <CalculatorInput value={rate} onChange={setRate} className="w-full" />
                        </div>
                        <div>
                            <TooltipLabel label="Duration" tooltip="Years to withdraw." />
                            <CalculatorInput value={duration} onChange={setDuration} className="w-full" />
                        </div>
                    </div>

                    {/* Inflation Toggle */}
                    <div className="border-t border-gray-200 pt-2">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-trust-teal flex items-center gap-1">
                                Adjust Inflation
                                <input type="checkbox" checked={inflationEnabled} onChange={(e) => setInflationEnabled(e.target.checked)} className="accent-growth-green" />
                            </label>
                        </div>
                        {inflationEnabled && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">Rate:</span>
                                <CalculatorInput value={inflationRate} onChange={setInflationRate} className="w-full" />
                                <span className="text-xs text-gray-500">%</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Visuals */}
            <div className="flex flex-col gap-4">
                <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SIP_COLORS[index % SIP_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="h-24 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorSWP" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4BB100" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4BB100" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Area type="monotone" dataKey="balance" stroke="#4BB100" fillOpacity={1} fill="url(#colorSWP)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white/40 rounded-xl p-4 text-center">
                    <div className="text-sm text-gray-600">Final Value</div>
                    <div className={`text-2xl font-bold ${finalValue > 0 ? 'text-growth-green' : 'text-red-500'}`}>{formatCurrency(finalValue)}</div>
                    <div className="text-xs text-gray-500 mt-2">
                        Total Withdrawn: {formatCurrency(totalWithdrawn)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function CalculatorsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white pt-24 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem]"> {/* Wider container for 3 cols */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-trust-teal mb-4 tracking-tight">Financial Simulator</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Advanced tools for wealth creations and debt management.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <CalculatorCard title="SIP Explorer">
                        <SIPCalculator />
                    </CalculatorCard>
                    <CalculatorCard title="EMI Expert">
                        <EMICalculator />
                    </CalculatorCard>
                    <CalculatorCard title="SWP Planner">
                        <SWPCalculator />
                    </CalculatorCard>
                </div>
            </div>
        </main>
    );
}
