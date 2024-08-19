import { Request, Response } from "express";
import User from "../../models/User";
import { CustomRequest } from '../../middleware/authAuthentication';

const getProfile = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user?.user_id;

        if (!userId) {
            return res.status(400).json({ msg: "User ID not provided" });
        }

        const user = await User.findOne({
            where: { user_id: userId }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({ msg: "Hello, " + user.name });

    } catch (error) {
        return res.status(500).json({ msg: "Error " + error });
    }
};

export default getProfile;
