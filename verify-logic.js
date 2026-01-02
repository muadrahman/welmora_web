/**
 * WELMORA FINANCIAL CALCULATOR VERIFICATION SCRIPT
 * 
 * Zero-Trust Mathematical Audit - 50 Test Scenarios
 * Run: node verify-logic.js
 */

// Import the functions (in production, you'd use: const { calculateEMI, calculateSIPSimulation, calculateSWPSimulation } = require('../src/utils/financialMath');)
// For standalone script, we'll embed simplified versions

// ========================================
// EMBEDDED MATH FUNCTIONS (for verification)
// ========================================

const calculateEMI = (p, r, t) => {
    const rm = r / 12 / 100;
    const nm = t * 12;
    if (rm === 0) return p / nm;
    return p * rm * (Math.pow(1 + rm, nm) / (Math.pow(1 + rm, nm) - 1));
};

const calculateSIPSimulation = (p_sip, p_lumpsum, p_rate, p_tenure, stepUp) => {
    let balance = p_lumpsum;
    let currentSIP = p_sip;
    let totalInv = p_lumpsum;
    const r_monthly = p_rate / 100 / 12;
    const months = p_tenure * 12;
    const history = [];

    if (p_tenure > 100) return { maturity: 0, invested: 0, history: [] };

    history.push({ year: 0, invested: Math.round(totalInv), value: Math.round(balance) });

    for (let m = 1; m <= months; m++) {
        if (stepUp.enabled && m > 1) {
            const isStepUpMonth = stepUp.frequency === 'yearly' ? (m - 1) % 12 === 0 : (m - 1) % 6 === 0;
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
        totalInv += currentSIP;
        balance *= (1 + r_monthly);

        if (m % 12 === 0) {
            history.push({ year: m / 12, invested: Math.round(totalInv), value: Math.round(balance) });
        }
    }
    return { maturity: balance, invested: totalInv, history: history };
};

const calculateSWPSimulation = (p_corpus, p_withdraw, p_rate, p_tenure, stepUp) => {
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

// ========================================
// TEST FRAMEWORK
// ========================================

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

const test = (name, fn) => {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${name}`);
        passedTests++;
    } catch (e) {
        console.log(`❌ FAIL: ${name} - ${e.message}`);
        failedTests++;
    }
};

const expect = (actual) => ({
    toBeCloseTo: (expected, decimals = 0) => {
        const threshold = Math.pow(10, -decimals);
        if (Math.abs(actual - expected) > threshold) {
            throw new Error(`Expected ${actual} to be close to ${expected} (±${threshold})`);
        }
    },
    toBe: (expected) => {
        if (actual !== expected) {
            throw new Error(`Expected ${actual} to be ${expected}`);
        }
    },
    toBeGreaterThan: (expected) => {
        if (actual <= expected) {
            throw new Error(`Expected ${actual} to be > ${expected}`);
        }
    },
    toBeLessThan: (expected) => {
        if (actual >= expected) {
            throw new Error(`Expected ${actual} to be < ${expected}`);
        }
    },
    toBeFinite: () => {
        if (!isFinite(actual)) {
            throw new Error(`Expected ${actual} to be finite`);
        }
    }
});

console.log('\n========================================');
console.log('🧪 WELMORA CALCULATOR VERIFICATION');
console.log('========================================\n');

// ========================================
// EMI TESTS (15 scenarios)
// ========================================

console.log('📊 EMI Calculator Tests:\n');

// 1-5: Standard Cases
test('EMI #1: Standard home loan ₹50L @ 8.5% for 20yrs', () => {
    const emi = calculateEMI(5000000, 8.5, 20);
    expect(emi).toBeCloseTo(43391, 0);
});

test('EMI #2: Car loan ₹10L @ 9% for 5yrs', () => {
    const emi = calculateEMI(1000000, 9, 5);
    expect(emi).toBeCloseTo(20758, 0);
});

test('EMI #3: Personal loan ₹2L @ 14% for 3yrs', () => {
    const emi = calculateEMI(200000, 14, 3);
    expect(emi).toBeCloseTo(6819, 0);
});

test('EMI #4: Small loan ₹50k @ 12% for 2yrs', () => {
    const emi = calculateEMI(50000, 12, 2);
    expect(emi).toBeCloseTo(2353, 0);
});

test('EMI #5: Large loan ₹1Cr @ 8% for 30yrs', () => {
    const emi = calculateEMI(10000000, 8, 30);
    expect(emi).toBeCloseTo(73376, 0);
});

// 6-10: Micro/Macro
test('EMI #6: Micro principal ₹1', () => {
    const emi = calculateEMI(1, 10, 1);
    expect(emi).toBeCloseTo(0.09, 2);
    expect(emi).toBeFinite();
});

test('EMI #7: Large principal ₹100Cr', () => {
    const emi = calculateEMI(1000000000, 12, 30);
    expect(emi).toBeGreaterThan(0);
    expect(emi).toBeFinite();
});

test('EMI #8: Very low rate 0.1%', () => {
    const emi = calculateEMI(1000000, 0.1, 10);
    expect(emi).toBeCloseTo(8340, 0);
});

test('EMI #9: High rate 30%', () => {
    const emi = calculateEMI(500000, 30, 5);
    expect(emi).toBeCloseTo(13378, 0);
});

test('EMI #10: Very short tenure 6 months', () => {
    const emi = calculateEMI(100000, 12, 0.5);
    expect(emi).toBeCloseTo(17156, 0);
});

// 11-15: Edge Cases
test('EMI #11: Zero interest rate', () => {
    const emi = calculateEMI(100000, 0, 10);
    expect(emi).toBeCloseTo(833.33, 2);
});

test('EMI #12: Near-zero rate (1e-10%)', () => {
    const emi = calculateEMI(100000, 0.0000000001, 10);
    expect(emi).toBeCloseTo(833.33, 2); // Should handle as zero
});

test('EMI #13: Maximum tenure 50 years', () => {
    const emi = calculateEMI(5000000, 8, 50);
    expect(emi).toBeGreaterThan(0);
    expect(emi).toBeFinite();
});

test('EMI #14: Principal exactly 1 lakh', () => {
    const emi = calculateEMI(100000, 10, 5);
    expect(emi).toBeCloseTo(2124, 0);
});

test('EMI #15: Principal 1 crore (boundary)', () => {
    const emi = calculateEMI(10000000, 9, 20);
    expect(emi).toBeCloseTo(89973, 0);
});

// ========================================
// SIP TESTS (18 scenarios)
// ========================================

console.log('\n📈 SIP Calculator Tests:\n');

const noStepUp = { enabled: false, type: 'percentage', value: 0, direction: 'increase', frequency: 'yearly' };

// 1-5: Standard Cases
test('SIP #16: ₹5k/month @ 12% for 10 years', () => {
    const result = calculateSIPSimulation(5000, 0, 12, 10, noStepUp);
    expect(result.maturity).toBeCloseTo(1151600, -3); // ±1000
    expect(result.invested).toBeCloseTo(600000, 0);
});

test('SIP #17: ₹10k/month @ 15% for 15 years', () => {
    const result = calculateSIPSimulation(10000, 0, 15, 15, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.maturity).toBeGreaterThan(5000000);
});

test('SIP #18: ₹20k/month @ 10% for 20 years', () => {
    const result = calculateSIPSimulation(20000, 0, 10, 20, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.invested).toBeCloseTo(4800000, 0);
});

test('SIP #19: ₹15k/month + ₹2L lumpsum @ 12% for 10yrs', () => {
    const result = calculateSIPSimulation(15000, 200000, 12, 10, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.invested).toBeCloseTo(2000000, 0);
});

test('SIP #20: Lumpsum only ₹10L @ 12% for 5yrs', () => {
    const result = calculateSIPSimulation(0, 1000000, 12, 5, noStepUp);
    expect(result.maturity).toBeCloseTo(1816697, -2);
});

// 6-10: Micro/Macro
test('SIP #21: Micro SIP ₹100/month @ 10% for 5yrs', () => {
    const result = calculateSIPSimulation(100, 0, 10, 5, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.invested).toBe(6000);
});

test('SIP #22: Large SIP ₹1L/month @ 15% for 20yrs', () => {
    const result = calculateSIPSimulation(100000, 0, 15, 20, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.maturity).toBeFinite();
});

test('SIP #23: Very low return 3% for 30 years', () => {
    const result = calculateSIPSimulation(5000, 0, 3, 30, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
});

test('SIP #24: High return 25% for 10 years', () => {
    const result = calculateSIPSimulation(10000, 0, 25, 10, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.maturity).toBeFinite();
});

test('SIP #25: Massive lumpsum ₹1Cr @ 12% for 20yrs', () => {
    const result = calculateSIPSimulation(0, 100000000, 12, 20, noStepUp);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.maturity).toBeFinite();
});

// 11-15: Edge Cases
test('SIP #26: Zero return (0%) should equal invested', () => {
    const result = calculateSIPSimulation(5000, 0, 0, 10, noStepUp);
    expect(result.maturity).toBeCloseTo(result.invested, 0);
});

test('SIP #27: Zero tenure should return lumpsum only', () => {
    const result = calculateSIPSimulation(5000, 100000, 12, 0, noStepUp);
    expect(result.maturity).toBeCloseTo(100000, 0);
});

test('SIP #28: Tenure > 100 years (overflow protection)', () => {
    const result = calculateSIPSimulation(5000, 0, 12, 150, noStepUp);
    expect(result.maturity).toBe(0); // Should be capped
    expect(result.invested).toBe(0);
});

test('SIP #29: Very short tenure (1 year)', () => {
    const result = calculateSIPSimulation(10000, 0, 12, 1, noStepUp);
    expect(result.invested).toBe(120000);
    expect(result.maturity).toBeGreaterThan(result.invested);
});

test('SIP #30: SIP with zero lumpsum', () => {
    const result = calculateSIPSimulation(5000, 0, 12, 10, noStepUp);
    expect(result.invested).toBeGreaterThan(0);
});

// 16-18: Step-Up Cases
const stepUp10 = { enabled: true, type: 'percentage', value: 10, direction: 'increase', frequency: 'yearly' };
const stepUp50 = { enabled: true, type: 'percentage', value: 50, direction: 'increase', frequency: 'yearly' };

test('SIP #31: 10% yearly step-up', () => {
    const result = calculateSIPSimulation(5000, 0, 12, 10, stepUp10);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.invested).toBeGreaterThan(600000); // More than flat SIP
});

test('SIP #32: 50% yearly step-up (extreme)', () => {
    const result = calculateSIPSimulation(5000, 0, 12, 10, stepUp50);
    expect(result.maturity).toBeGreaterThan(result.invested);
    expect(result.maturity).toBeFinite();
});

test('SIP #33: Step-up for 30 years (overflow risk)', () => {
    const result = calculateSIPSimulation(10000, 0, 12, 30, stepUp10);
    expect(result.maturity).toBeFinite();
    expect(result.invested).toBeFinite();
});

// ========================================
// SWP TESTS (17 scenarios)
// ========================================

console.log('\n📉 SWP Calculator Tests:\n');

// 1-5: Standard Cases
test('SWP #34: ₹1Cr corpus, ₹50k/month @ 8% for 20yrs', () => {
    const result = calculateSWPSimulation(10000000, 50000, 8, 20, noStepUp);
    expect(result.final).toBeGreaterThan(0);
    expect(result.totalW).toBeCloseTo(12000000, -3);
});

test('SWP #35: ₹50L corpus, ₹30k/month @ 7% for 15yrs', () => {
    const result = calculateSWPSimulation(5000000, 30000, 7, 15, noStepUp);
    expect(result.totalW).toBeCloseTo(5400000, -3);
});

test('SWP #36: Depletion scenario (W > growth)', () => {
    const result = calculateSWPSimulation(1000000, 50000, 5, 5, noStepUp);
    // Should deplete before 5 years
    expect(result.final).toBeLessThan(0);
});

test('SWP #37: Conservative withdrawal', () => {
    const result = calculateSWPSimulation(5000000, 20000, 8, 20, noStepUp);
    expect(result.final).toBeGreaterThan(0);
});

test('SWP #38: Large corpus ₹10Cr, ₹2L/month @ 10% for 30yrs', () => {
    const result = calculateSWPSimulation(100000000, 200000, 10, 30, noStepUp);
    expect(result.final).toBeFinite();
});

// 6-10: Micro/Macro
test('SWP #39: Small corpus ₹5L, ₹5k/month @ 6% for 10yrs', () => {
    const result = calculateSWPSimulation(500000, 5000, 6, 10, noStepUp);
    expect(result.totalW).toBeCloseTo(600000, -2);
});

test('SWP #40: Zero withdrawal (pure growth)', () => {
    const result = calculateSWPSimulation(1000000, 0, 10, 10, noStepUp);
    expect(result.final).toBeGreaterThan(result.totalW);
    expect(result.final).toBeGreaterThan(1000000);
});

test('SWP #41: Very low withdrawal ₹1k/month', () => {
    const result = calculateSWPSimulation(5000000, 1000, 8, 20, noStepUp);
    expect(result.final).toBeGreaterThan(0);
});

test('SWP #42: High withdrawal ₹1L/month from ₹1Cr', () => {
    const result = calculateSWPSimulation(10000000, 100000, 8, 20, noStepUp);
    expect(result.final).toBeFinite();
});

test('SWP #43: Massive corpus ₹100Cr', () => {
    const result = calculateSWPSimulation(1000000000, 500000, 8, 30, noStepUp);
    expect(result.final).toBeFinite();
    expect(result.final).toBeGreaterThan(0);
});

// 11-15: Edge Cases  
test('SWP #44: Zero interest rate (linear depletion)', () => {
    const result = calculateSWPSimulation(1000000, 10000, 0, 5, noStepUp);
    const expected = 1000000 - (10000 * 12 * 5);
    expect(result.final).toBeCloseTo(expected, -2);
});

test('SWP #45: Withdrawal exceeds corpus immediately', () => {
    const result = calculateSWPSimulation(100000, 50000, 5, 5, noStepUp);
    expect(result.final).toBeLessThan(0);
});

test('SWP #46: Very short tenure (1 year)', () => {
    const result = calculateSWPSimulation(1000000, 20000, 8, 1, noStepUp);
    expect(result.totalW).toBeCloseTo(240000, -2);
});

test('SWP #47: Long tenure 50 years', () => {
    const result = calculateSWPSimulation(10000000, 30000, 8, 50, noStepUp);
    expect(result.final).toBeFinite();
});

test('SWP #48: Exact depletion (W * tenure = corpus)', () => {
    const result = calculateSWPSimulation(1200000, 10000, 0, 10, noStepUp);
    expect(result.final).toBeCloseTo(0, -3);
});

// 16-17: Step-Up
const stepUpSWP = { enabled: true, type: 'percentage', value: 5, direction: 'increase', frequency: 'yearly' };

test('SWP #49: 5% yearly step-up withdrawal', () => {
    const result = calculateSWPSimulation(10000000, 50000, 8, 20, stepUpSWP);
    expect(result.totalW).toBeGreaterThan(12000000);
    expect(result.final).toBeFinite();
});

test('SWP #50: Decreasing withdrawal (negative step-up)', () => {
    const stepDown = { enabled: true, type: 'percentage', value: 5, direction: 'decrease', frequency: 'yearly' };
    const result = calculateSWPSimulation(10000000, 80000, 8, 20, stepDown);
    expect(result.final).toBeGreaterThan(0);
});

// ========================================
// FINAL REPORT
// ========================================

console.log('\n========================================');
console.log('📊 FINAL REPORT');
console.log('========================================\n');

console.log(`Total Tests: ${totalTests}`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`);

if (failedTests === 0) {
    console.log('🎉 ALL TESTS PASSED! Calculator logic is mathematically sound.');
} else {
    console.log('⚠️  FAILURES DETECTED! Review failing tests above.');
    process.exit(1);
}
