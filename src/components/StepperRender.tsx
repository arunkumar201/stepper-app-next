"use client";

import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { I_CHECKOUT_STEPS } from "./CheckOutStepper";
import { cn } from "@/lib/utils";
import { isValidConfig } from "@/utils";
import { useState } from "react";

type StepperProps = {
	stepsConfig: I_CHECKOUT_STEPS[];
};

const StepperRender = ({ stepsConfig = [] }: StepperProps) => {
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [isCompleted, setIsCompleted] = useState(false);

	if (!Array.isArray(stepsConfig) || stepsConfig.length === 0) {
		return <div>No steps provided.</div>;
	}

	if (!isValidConfig(stepsConfig)) {
		return <div>Error: Invalid steps configuration.</div>;
	}

	function handleNextStep(): void {
		console.log(currentStep, "config length", stepsConfig.length);
		setCurrentStep((prevStep) => {
			if (prevStep === stepsConfig.length) {
				setIsCompleted(true);
				return prevStep;
			} else {
				return prevStep + 1;
			}
		});
	}

	const getCurrentProgressBarWidth = (): number => {
		const progress = ((currentStep-1) / stepsConfig.length) * 100;
		console.debug("🚀 ~ getCurrentProgressBarWidth ~ progress:", progress);
		return progress;
	};

	const ActiveComponent = stepsConfig[currentStep - 1].component;
	return (
		<>
			<div className="flex items-center justify-between flex-col">
				<div className="flex flex-row items-center gap-x-4">
					{stepsConfig.map((step: I_CHECKOUT_STEPS, _) => {
						return (
							<div
								key={step.id}
								className={cn("flex flex-col items-center mr-20 relative z-10")}
							>
								<div
									className={cn(
										"rounded-full border border-gray-300 w-10 h-10  flex items-center justify-center",
										currentStep > step.id || isCompleted
											? "bg-green-600 text-zinc-50"
											: "",
										currentStep == step.id && !isCompleted
											? "bg-blue-600 text-zinc-50"
											: ""
									)}
								>
									{currentStep > step.id || isCompleted ? (
										<Check size={23} />
									) : (
										step.id
									)}
								</div>
								<div className="mt-2 font-medium text-yellow-900 w-max">
									{step.label}
								</div>
							</div>
						);
					})}
					{/* progress Bar */}
					<div className="left-0 w-full top-1/4  h-2 bg-gray-800 rounded-full absolute z-2">
						<div
							className={cn("bg-green-700 h-full transition-all duration-300")}
							style={{
								width: `${getCurrentProgressBarWidth()}%`,
							}}
						></div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-4 mt-12">
					<div>{ActiveComponent}</div>
					{!isCompleted && (
						<Button onClick={handleNextStep}>
							{currentStep - 1 === stepsConfig.length ? "Competed" : "Next"}
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default StepperRender;
