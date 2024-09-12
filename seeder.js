// @ts-nocheck
import env from "$/server/env.js";
const { auth, response } = env;

export default (seed_method) => async (req, res) => {
    try {
        // auth
        if (req.query.key != auth.seed_key) {
            throw {
                error: { name: "not authorized", msg: "please provide seed key" },
                status_code: response.status_codes.not_authorized,
            };
        }

        // Number of entries
        let number_of_entries = 0;
        number_of_entries = parseInt(req.params.no);
        if (!(number_of_entries > 0)) {
            throw {
                error: { name: "factory error", msg: "not defined factory number" },
                status_code: response.status_codes.invalid_field,
            };
        }

        // generate
        await seed_method(number_of_entries);

        // done
        if (req.baseUrl != "/server/api/factory") {
            return res.status(response.status_codes.ok).json({
                result: {
                    name: "succeed",
                    msg: `created ${number_of_entries} mock`,
                },
            });
        } else {
            return;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};
