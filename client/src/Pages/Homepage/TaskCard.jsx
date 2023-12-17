// LizardCard.js
import React from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoggedState } from '../../context/auth';

const TaskCard = ({ title, description, image, id }) => {

    const {isLoggedIn} = LoggedState();
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0;
    console.log(currentUser?.addictType);

    const navigate = useNavigate();

    const handleClick = ()=>{
        console.log(title);
        navigate(`/Tasks/${title}/${currentUser.addictType}`);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"

                    image={image}
                    alt="green iguana"
                    style={{ backgroundSize: "cover", width: '100%', maxHeight:"110px" }}
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
            <Button fullWidth sx={{ backgroundColor: '#7E30E1', color: 'white', '&:hover': { color: 'black' , backgroundColor:'lightpink' } }} onClick={handleClick}>
                View Tasks
            </Button>
        </Card>
    );
};
export default TaskCard;
