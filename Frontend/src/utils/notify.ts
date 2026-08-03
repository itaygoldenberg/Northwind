import iziToast, { IziToastSettings } from "iziToast";
import "iziToast/dist/css/iziToast.css";

class Notify {

    private settings: IziToastSettings = {
        position: "topLeft",
        transitionIn: "fadeInRight",
        transitionOut: "fadeOutLeft",
        timeout: 3000,
        theme: "dark",
        backgroundColor: "transparent"
    };

    public success(message: string): void {
        const config: IziToastSettings = {
            ...this.settings,
            message,
            class: "toast-liquid-success"
        };

        iziToast.success(config);
    }

    public error(err: unknown): void {
        let message = "";

        if (typeof err === "string") {
            message = err;
        } else if (err instanceof Error) {
            message = err.message;
        } else if (err && typeof err === "object") {
            const obj = err as Record<string, unknown>;
            const response = obj.response as Record<string, unknown> | undefined;

            if (response && response.data) {
                if (typeof response.data === "string") {
                    message = response.data;
                } else if (typeof response.data === "object") {
                    const dataObj = response.data as Record<string, unknown>;
                    if (typeof dataObj.message === "string") {
                        message = dataObj.message;
                    }
                }
            }

            if (!message && typeof obj.message === "string") {
                message = obj.message;
            }
        }

        if (!message) {
            message = "An unknown error occurred";
        }

        const config: IziToastSettings = {
            ...this.settings,
            message,
            class: "toast-liquid-error"
        };

        iziToast.error(config);
    }
}

export const notify = new Notify();

// import iziToast, { IziToastSettings } from "iziToast";
// import "iziToast/dist/css/iziToast.css";

// class Notify {

//     private settings: IziToastSettings = {
//         position: "topLeft",
//         transitionIn: "fadeInRight",
//         transitionOut: "fadeOutLeft",
//         timeout: 3000
//     };

//     public success(message: string): void {
//         this.settings.message = message;
//         iziToast.success(this.settings);
//     }
//    public error(message: string): void {
//         this.settings.message = message;
//         iziToast.error(this.settings);
//     }
// }

// export const notify = new Notify();
