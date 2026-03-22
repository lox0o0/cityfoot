import { TIERS } from '../data/tiers'

export function getTierForCredits(totalCredits) {
  let currentTier = TIERS[0]
  for (const tier of TIERS) {
    if (totalCredits >= tier.threshold) {
      currentTier = tier
    }
  }
  return currentTier
}

export function getNextTier(totalCredits) {
  for (const tier of TIERS) {
    if (totalCredits < tier.threshold) {
      return tier
    }
  }
  return null
}

export function getTierIndex(tierName) {
  return TIERS.findIndex(t => t.name === tierName)
}

export function canRedeemReward(reward, creditBalance, totalCreditsEarned) {
  const userTier = getTierForCredits(totalCreditsEarned)
  const requiredTierIndex = getTierIndex(reward.tierRequired)
  const userTierIndex = getTierIndex(userTier.name)
  return creditBalance >= reward.cost && userTierIndex >= requiredTierIndex
}

export function isTierUnlocked(reward, totalCreditsEarned) {
  const userTier = getTierForCredits(totalCreditsEarned)
  const requiredTierIndex = getTierIndex(reward.tierRequired)
  const userTierIndex = getTierIndex(userTier.name)
  return userTierIndex >= requiredTierIndex
}
