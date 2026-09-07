/**
 * Currency conversion and formatting utilities for Frontend.
 * Standard exchange rate: 1 USD ≈ 84 INR
 */
export const USD_TO_INR_RATE = 84;

// Cache live rate if available
let liveRate = USD_TO_INR_RATE;

// Attempt to fetch fresh rate asynchronously
fetch('https://open.er-api.com/v6/latest/USD')
  .then((res) => res.json())
  .then((data) => {
    if (data?.rates?.INR) {
      liveRate = data.rates.INR;
    }
  })
  .catch(() => {
    // Keep fallback 84
  });

/**
 * Convert any amount (especially INR from API) to USD.
 * @param {number|string} amount
 * @param {string} [currency]
 * @returns {number} Converted integer USD amount
 */
export const convertToUSD = (amount, currency = 'USD') => {
  const num = Number(amount) || 0;
  if (!num) return 0;

  const cur = String(currency || '').trim().toUpperCase();
  const isINR = cur === 'INR' || cur === '₹' || cur === 'RS' || cur === 'RS.';

  // If explicitly INR or amount is > 3000 (clearly an Indian Rupee fare like 78,831 or 87,899)
  if (isINR || num > 3000) {
    return Math.round(num / liveRate);
  }

  return Math.round(num);
};

/**
 * Format any amount into clean USD currency display ($XXX).
 * Automatically converts INR to USD before formatting.
 * @param {number|string} amount
 * @param {string} [currency]
 * @returns {string} e.g. "$938"
 */
export const formatUSD = (amount, currency = 'USD') => {
  const usdAmount = convertToUSD(amount, currency);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usdAmount);
};
