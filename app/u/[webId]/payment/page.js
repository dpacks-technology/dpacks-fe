import Input from "@/app/components/Input";

export default function Payment() {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "500px",
                margin: "auto",
                marginTop: "50px",
                textAlign: "center",
            }}
        >
            <div style={{ textAlign: "left" }}>
                <Input label={"Card Number"} color={"primary"} /> <br /><br />
                <Input label={"Country/ Region"} color={"primary"} /> <br /><br />
                <Input label={"Expiration Date"} color={"primary"} /> <>  </>
                <Input label={"CVV"} color={"primary"} /> <br /><br />
            </div>

            <button className="bg-blue-950 text-white py-2 px-4 mt-4 rounded-lg">
                Complete Purchase
            </button>

            <p
                style={{
                    color: "grey", // Text color set to grey
                    fontSize: "12px", // Font size adjusted
                    marginTop: "20px", // Add margin-top to create space between button and paragraph
                }}
            >
                Your subscription will automatically renew every twelve months. After
                your first year, you will be charged $144.00 USD, plus applicable taxes,
                on each renewal until you cancel your subscription. You can cancel at any
                time on the Subscription page of your account or by submitting a If you
                cancel, previous charges will not be refunded, but you may continue to
                use the service until the end of the term you paid for. By clicking the
                Complete purchase button above, you are agreeing to our Terms of Service
                and acknowledge that you have read our Privacy Policy.
            </p>
        </div>
    );
}
