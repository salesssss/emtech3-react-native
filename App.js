import React, { useState, useEffect } from 'react';
import { Box, Button, Container, List, ListItem, ListItemText, TextField, AppBar, Toolbar, IconButton, Typography, Modal } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// Modal Component
const BasicModal = ({ open, handleClose, title, description, children }) => (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
    >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                borderRadius: 1,
                boxShadow: 24,
                p: 4,
            }}
        >
            <Typography id="modal-title" variant="h6">
                {title}
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                {description}
            </Typography>
            {children} {/*Added to render children components inside modal*/}
        </Box>
    </Modal>
);

// NavBar component
const NavBar = ({ onUserIconClick }) => (
    <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="user icon" onClick={onUserIconClick}>
                <AccountCircleIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Goal List
            </Typography>
        </Toolbar>
    </AppBar>
);

// Main App component
const App = () => {
    const [goals, setGoals] = useState(['Learn React', 'Build a project', 'Study for exams']);
    const [openWelcomeModal, setOpenWelcomeModal] = useState(false);
    const [openWarningModal, setOpenWarningModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentGoalToDelete, setCurrentGoalToDelete] = useState('');
    const [newGoal, setNewGoal] = useState('');

    // Effect to check for warning modal
    useEffect(() => {
        if (goals.length > 5) {
            setOpenWarningModal(true);
        }
    }, [goals]);

    const handleOpenWelcomeModal = () => {
        setOpenWelcomeModal(true);
    };

    const handleCloseWelcomeModal = () => {
        setOpenWelcomeModal(false);
    };

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleDeleteGoal = (goal) => {
        setCurrentGoalToDelete(goal);
        setOpenDeleteModal(true);
    };

    const confirmDeleteGoal = () => {
        setGoals(goals.filter((item) => item !== currentGoalToDelete));
        handleCloseDeleteModal();
    };

    const handleAddGoal = () => {
        if (newGoal.trim() !== '') {
            setGoals([...goals, newGoal]);
            setNewGoal('');
        } else {
            alert("Please enter a valid task.");
        }
    };

    return (
        <Container>
            <NavBar onUserIconClick={handleOpenWelcomeModal} />
            <Box sx={{ my: 2 }}>
                <TextField
                    label="New Goal"
                    variant="outlined"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleAddGoal}>
                    Add Goal
                </Button>
            </Box>
            <List>
                {goals.map((goal, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={goal} />
                        <Button variant="outlined" onClick={() => handleDeleteGoal(goal)}>
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>

            {/* Welcome Modal */}
            <BasicModal
                open={openWelcomeModal}
                handleClose={handleCloseWelcomeModal}
                title="Welcome!"
                description="Welcome to your goal list application!"
            />

            {/* Warning Modal */}
            <BasicModal
                open={openWarningModal}
                handleClose={handleCloseWarningModal}
                title="Warning!"
                description="You have more than 5 goals! Consider focusing on a few to avoid feeling overwhelmed."
            />

            {/* Delete Confirmation Modal */}
            <BasicModal
                open={openDeleteModal}
                handleClose={handleCloseDeleteModal}
                title="Confirm Deletion"
                description={`Are you sure you want to delete "${currentGoalToDelete}"?`}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="outlined" onClick={confirmDeleteGoal}>
                        Yes
                    </Button>
                    <Button variant="outlined" onClick={handleCloseDeleteModal}>
                        No
                    </Button>
                </Box>
            </BasicModal>
        </Container>
    );
};

export default App;