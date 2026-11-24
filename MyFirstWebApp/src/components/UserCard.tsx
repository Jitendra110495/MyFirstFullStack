/* 
import "./Users.css";

function UserCard({ user }) {
    return (
        <div className="user-card">
            <p><strong>{user.name}</strong></p>
            <p className="user-email">{user.email}</p>
        </div>
    );
}

export default UserCard;
 */

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { User } from "../types/user";

interface UserCardProps {
    user: User;
}

function UserCard({ user }: UserCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">
                    {user.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserCard;