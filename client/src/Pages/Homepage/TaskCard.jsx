// LizardCard.js
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoggedState } from '../../context/auth';
import toast from 'react-hot-toast';

const TaskCard = ({ title, description, image, locked }) => {
    console.log(locked);
    const { isLoggedIn } = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
    const taskScore = currentUser?.TaskScore || 0;

    const navigate = useNavigate();


    const handleClick = () => {
        if (taskScore >= 0) {
            // Perform any additional actions before navigating if needed
            navigate(`/Tasks/${title}/${currentUser.addictType}`);
        }
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={image}
                    alt="green iguana"
                    style={{ backgroundSize: "cover", width: '100%', maxHeight: "110px" }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button
                fullWidth
                sx={{
                    backgroundColor: locked ? 'red' : '#7E30E1',
                    color: locked ? 'white' : 'black',
                    '&:hover': {
                        backgroundColor: locked ? '#D80032' : 'lightpink',
                        cursor: locked ? 'not-allowed' : 'pointer'
                    },
                }}
                onClick={handleClick}
                disabled={locked} // Disable the button if locked is less than 0
            >
                View Tasks
            </Button>
        </Card>
    );
};
export default TaskCard;
