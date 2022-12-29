import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));



function getSteps() {
    return ['', '', ''];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return (
                <>
                    <div className="form_section">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="formBox">
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Ship-to Name(EN)</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Value"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Ship-to Name(Local Language)</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="N1"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Group Company</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="SDCC"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Group Company</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="SDCC"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Monthly Potential(tons)</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Value"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="inputBox">
                                                    <label>Goods Recieving Hours</label>
                                                    <input type="time" name="" className="input" />
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="inputBox">
                                                    <label>Sales Representatives</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="inputBox">
                                                    <label>Transportation Zone</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>SCCO Route</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-4">

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        case 1:
            return (
                <>
                    <div className="form_section">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="formBox">
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Sales District</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Street</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Region</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Province / ASE Territory</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>District / Distributor Territory</label>
                                                    <select className="input">
                                                        <option value="" selected disabled>Select</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Sub District</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="inputBox">
                                                    <label>Postal Code</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="inputBox">
                                                            <label>Latitude</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                placeholder="Enter"
                                                                className="input"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-6">
                                                        <div className="inputBox">
                                                            <label>Longitude</label>
                                                            <input
                                                                type="text"
                                                                name=""
                                                                placeholder="Enter"
                                                                className="input"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        case 2:
            return (
                <>
                    <div className="form_section">
                        <div className="container-fluid">
                            <div className="container">
                                <div className="formBox">
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <p>Owner Details</p>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>First Name</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Last Name</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Primary Mobile Number</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="+187 71917 17"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Alternate Mobile Number</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="+187 71917 17"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="+187 71917 17"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Primary Email Address</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Birthday</label>
                                                    <input
                                                        type="date"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-8">

                                            </div>

                                            <div className="col-sm-12">
                                                <p>Contact Person Details</p>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>First Name</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Last Name</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Mobile Number</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="+187 71917 17"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>


                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Phone Number</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="+187 71917 17"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-4">
                                                <div className="inputBox ">
                                                    <label>Email Address</label>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        placeholder="Enter"
                                                        className="input"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-sm-8">

                                            </div>

                                            <div className="col-12">

                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        default:
            return 'Unknown stepIndex';
    }
}

const CreateNewShipToStepper = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const buttonContainer = {
        marginLeft: '42px',
        marginBottom: '20px'
    }

    const redButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: '#ef0000',
        padding: '10px 60px',
        border: 'none',
        borderRadius: '4px',
        fontWeight: '600',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: '#ef0000',
        }
    };

    const blackButton = {
        textTransform: 'uppercase',
        marginTop: '8px',
        background: '#000000',
        fontWeight: '600',
        padding: '10px 60px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff',
            background: '#000000',
        }
    };



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <div className={classes.root}>

                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div >
                                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                <div style={buttonContainer}>
                                    <button style={redButton} onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </button>
                                    &nbsp;&nbsp;
                                    <button style={blackButton} disabled={activeStep === 0} onClick={handleBack}>Cancel</button>
                                   
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}

export default CreateNewShipToStepper;


