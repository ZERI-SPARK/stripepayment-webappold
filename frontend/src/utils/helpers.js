export function getPlanId(planinterval, activeOption) {
  let planIds = {
    basicyearly: "plan_OQgu32k54iLiMo",
    standardyearly: "plan_OQguP6l3ivkjNN",
    premiumyearly: "plan_OQgunOw7PEtYcx",
    regularyearly: "plan_OQguBzgnXX466K",
    basicmonthly: "plan_OQh5RGDtR8FDRL",
    standardmonthly: "plan_OQh5w2YAE3WjRe",
    premiummonthly: "plan_OQh5vDJMJrkJ7g",
    regularmonthly: "plan_OQh5dXdAczxXcK",
  };
  let planId;
  if ((planinterval = "month" && activeOption == "basic")) {
    planId = planIds.basicmonthly;
  } else if ((planinterval = "month" && activeOption == "standard")) {
    planId = planIds.standardmonthly;
  } else if ((planinterval = "month" && activeOption == "premium")) {
    planId = planIds.premiummonthly;
  } else if ((planinterval = "month" && activeOption == "regular")) {
    planId = planIds.regularmonthly;
  } else if ((planinterval = "yearly" && activeOption == "regular")) {
    planId = planIds.regularyearly;
  } else if ((planinterval = "yearly" && activeOption == "premium")) {
    planId = planIds.premiumyearly;
  } else if ((planinterval = "yearly" && activeOption == "standard")) {
    planId = planIds.standardyearly;
  } else if ((planinterval = "yearly" && activeOption == "basic")) {
    planId = planIds.basicyearly;
  }
  return planId;
}
