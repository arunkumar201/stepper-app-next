import { I_CHECKOUT_STEPS } from "@/components/CheckOutStepper";
import React from "react";

export const isValidConfig = (stepsConfig: I_CHECKOUT_STEPS[]): boolean => {
	return stepsConfig.every(
		(step) =>
			typeof step.id === "number" &&
			typeof step.label === "string" &&
			React.isValidElement(step.component) &&
			(step.href === undefined || typeof step.href === "string")
	);
};
