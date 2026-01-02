
// Generic Solver Engine
export function solve(target: number, fn: (x: number) => number, min: number, max: number, precision = 0.01): number {
    let low = min;
    let high = max;
    let iterations = 0;

    // Check monotonicity direction
    const yLow = fn(low);
    const yHigh = fn(high);
    const increasing = yHigh > yLow;

    while (high - low > precision && iterations < 100) {
        const mid = (low + high) / 2;
        const yMid = fn(mid);

        // Relative error check for large numbers
        if (Math.abs(yMid - target) / (target || 1) < 0.0001) return mid;

        if (increasing) {
            if (yMid < target) low = mid;
            else high = mid;
        } else {
            if (yMid < target) high = mid;
            else low = mid;
        }
        iterations++;
    }
    return (low + high) / 2;
}

// EMI Logic
export const calculateEMI = (p: number, r: number, t: number) => {
    const rm = r / 12 / 100;
    const nm = t * 12;
    if (rm === 0) return p / nm;
    return p * rm * (Math.pow(1 + rm, nm) / (Math.pow(1 + rm, nm) - 1));
};

export const calculateEMISchedule = (principal: number, rate: number, tenure: number, emi: number) => {
    const r_monthly = rate / 12 / 100;
    // const n_months = tenure * 12; // Unused in loop control directly if we use tenure in loop
    let balance = principal;
    let totalInterest = 0;
    const data = [];

    // if (principal > 0 && tenure * 12 > 0 && tenure * 12 < 1200) { // Check done by caller usually
    for (let yr = 0; yr <= Math.ceil(tenure); yr++) {
        data.push({ year: yr, balance: Math.max(0, Math.round(balance)), interestPaid: Math.round(totalInterest) });
        for (let m = 0; m < 12; m++) {
            if (balance <= 0) break;
            const int = balance * r_monthly;
            const prin = emi - int;
            balance -= prin;
            totalInterest += int;
        }
    }
    // }
    return { history: data, totalInterest };
};


// SIP Logic
export const calculateSIPSimulation = (
    p_sip: number,
    p_lumpsum: number,
    p_rate: number,
    p_tenure: number,
    stepUp: { enabled: boolean; type: string; value: number; direction: string; frequency: string }
) => {
    let balance = p_lumpsum;
    let currentSIP = p_sip;
    let totalInv = p_lumpsum;
    const r_monthly = p_rate / 100 / 12;

    // Benchmark Calculation (e.g. FD at 6%)
    let benchmarkBalance = p_lumpsum;
    const r_benchmark = 6 / 100 / 12;

    const months = p_tenure * 12;

    const history = [];
    if (p_tenure > 100) return { maturity: 0, invested: 0, history: [] };

    history.push({ year: 0, invested: Math.round(totalInv), value: Math.round(balance), benchmark: Math.round(benchmarkBalance) });

    for (let m = 1; m <= months; m++) {
        if (stepUp.enabled && m > 1) {
            const isStepUpMonth = stepUp.frequency === 'yearly' ? (m - 1) % 12 === 0 : (m - 1) % 6 === 0; // Support Yearly or Half-Yearly
            if (isStepUpMonth) {
                if (stepUp.type === 'percentage') {
                    const factor = 1 + (stepUp.value / 100);
                    if (stepUp.direction === 'increase') currentSIP *= factor;
                    else currentSIP /= factor;
                } else {
                    if (stepUp.direction === 'increase') currentSIP += Number(stepUp.value);
                    else currentSIP = Math.max(0, currentSIP - Number(stepUp.value));
                }
            }
        }

        balance += currentSIP;
        benchmarkBalance += currentSIP;
        totalInv += currentSIP;

        balance *= (1 + r_monthly);
        benchmarkBalance *= (1 + r_benchmark);

        if (m % 12 === 0) {
            history.push({
                year: m / 12,
                invested: Math.round(totalInv),
                value: Math.round(balance),
                benchmark: Math.round(benchmarkBalance)
            });
        }
    }
    return { maturity: balance, invested: totalInv, history: history };
};

// SWP Logic
export const calculateSWPSimulation = (
    p_corpus: number,
    p_withdraw: number,
    p_rate: number,
    p_tenure: number,
    stepUp: { enabled: boolean; type: string; value: number; direction: string; frequency: string }
) => {
    let balance = p_corpus;
    let currentW = p_withdraw;
    let totalW = 0;
    const r_monthly = p_rate / 100 / 12;
    const months = p_tenure * 12;
    const history = [];

    history.push({ year: 0, balance: Math.round(balance) });

    for (let m = 1; m <= months; m++) {
        if (stepUp.enabled && m > 1 && (m - 1) % 12 === 0) {
            if (stepUp.type === 'percentage') {
                const factor = 1 + (stepUp.value / 100);
                if (stepUp.direction === 'increase') currentW *= factor;
                else currentW /= factor;
            } else {
                if (stepUp.direction === 'increase') currentW += stepUp.value;
                else currentW = Math.max(0, currentW - stepUp.value);
            }
        }
        balance = balance * (1 + r_monthly) - currentW;
        totalW += currentW;

        if (m % 12 === 0) history.push({ year: m / 12, balance: Math.max(0, Math.round(balance)) });
    }
    return { final: balance, totalW, history };
};

// Currency Formatter (en-IN)
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};
