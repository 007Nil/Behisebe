import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";

async function setupSignIn(): Promise<string> {
    GoogleSignin.configure({
        webClientId:
            "137462762449-paj114fuodcmd22rgegs81rfqsru229t.apps.googleusercontent.com",
        // offlineAccess: true,
        scopes: ['https://www.googleapis.com/auth/drive','https://www.googleapis.com/auth/drive.file']
    });
    try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();
        // console.log(userInfo);
        const accessToken = (await GoogleSignin.getTokens()).accessToken;

        // console.log(accessToken["accessToken"])
        return accessToken;
    } catch (e) {
        console.log(e)
        // setError(e);
        return "";
    }
}

export { setupSignIn }