"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const FHIR = require("fhirclient");

const EMR = {
    CERNER: 'cerner',
    EPIC: 'epic',
    SMART: 'smart',
    NONE: 'none',
}

async function epicLaunch(clientId, redirect, iss) {
    const scope = "launch online_access openid fhirUser"
    const redirect_uri = redirect ?? '';
    return FHIR.oauth2.authorize({
        client_id: clientId,
        iss: iss,
        "redirect_uri": redirect_uri,
        scope: scope,
    });
}

function SmartLaunchHandler(clientID, emrType) {
    const curEMR = emrType;
    const [fhirClient, setFhirClient] = useState(undefined);

    useEffect(() => {
        (async () => {
            try {
                // Authorize with the EHR
                const queryString = window.location.search;
                const originString = window.location.origin;
                const urlParams = new URLSearchParams(queryString);
                const iss = urlParams.get('iss');

                if (iss !== null && iss.includes(emrType))
                    await epicLaunch(clientID, originString, iss);

                setFhirClient(FHIR.oauth2.ready());
            }
            catch (e) {
                if (e instanceof Error) {
                    throw e;
                }
            }
        })();
    }, [clientID, curEMR]);
    return fhirClient
}

exports = module.exports = SmartLaunchHandler;