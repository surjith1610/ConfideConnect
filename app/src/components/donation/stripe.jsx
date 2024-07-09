import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import Donation from "./donation"

const PUBLIC_KEY = "pk_test_51P7SHCP3vL0RmPJQRrVKwIPHkub9YI1yo5EdJNGWrDhCmvT8uT6L9z8HhK9zVu2Rv17tPlM3XeQeCPJqs4FXjrNT00vR2ozv59"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default stripeTestPromise;