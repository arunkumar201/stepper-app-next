import CustomerInfo from "./stepper/CustomerInfo";
import DeliverInfo from "./stepper/DeliverInfo";
import PaymentInfo from "./stepper/PaymentInfo";
import React from "react";
import ShippingInfo from "./stepper/ShippingInfo";
import StepperRender from "./StepperRender";

type Props = {};

export interface I_CHECKOUT_STEPS {
	id: number;
	label: string;
	component: React.JSX.Element;
	href?: string;
}
const CHECKOUT_STEPS: I_CHECKOUT_STEPS[] = [
	{
		id: 1,
		label: "Customer Info",
		component: <CustomerInfo />,
		href: "/customer-info",
	},
	{
		id: 2,
		label: "Shipping Info",
		component: <ShippingInfo />,
		href: "/shipping-info",
	},
	{
		id: 3,
		label: "Payment ",
		component: <PaymentInfo />,
		href: "/payment",
	},
	{
		id: 4,
		label: "Deliver ",
		component: <DeliverInfo />,
		href: "/deliver",
	},
];

const CheckOutStepper = (props: Props) => {
	return (
		<>
			<div className="flex flex-col items-start gap-y-4">
				<h1 className="text-xl md:text-3xl font-bold font-serif text-purple-600">
					Checkout{" "}
				</h1>
				<StepperRender stepsConfig={CHECKOUT_STEPS} />
			</div>
		</>
	);
};

export default CheckOutStepper;
