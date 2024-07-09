import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import Donation from "../components/donation/donation";
import stripeTestPromise from "../components/donation/stripe";

function StripeContainerPage() {
    return (
        <Elements stripe={stripeTestPromise}>
            <Donation />
        </Elements>
    );
}

export default StripeContainerPage;
