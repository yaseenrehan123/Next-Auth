import { Resend } from "resend";
import { SendMailProps } from "./types";
declare global {
    var resend: Resend | undefined
}
export const resend = globalThis.resend || new Resend(process.env.RESEND_API_KEY);

if (process.env.NODE_ENV !== "production") globalThis.resend = resend;

export async function sendMail({ subject, address, message }: SendMailProps) {
    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: address,
        subject: subject,
        html: message
    });

    if (error) {
        throw new Error("SEND MAIL FAILED", { cause: error.message });
    };

    console.log(data);
}