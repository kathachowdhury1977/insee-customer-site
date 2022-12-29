import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import {Link} from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(() => ({
    root: {
        padding: "15px",
        textAlign: "center",
        width: "447px"
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        // margin: 0,
        padding: theme.spacing(1),
        marginTop: "20px",
        display: "block"
    },
}))(MuiDialogActions);

let fileObj = [];
let fileArray = [];
const imgwidth = {
    width: "100%",
    height: '114px'
};

export default function SaveCasePopup(props) {
    const [open, setOpen] = React.useState(false);
    const [showResults, setShowResults] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setShowResults(false);
    };

    console.log(props.show);
    console.log(props.message)

    const {t} = useTranslation();
    const [file, setFile] = React.useState(null)
    const dispatch = useDispatch();
    const event = useSelector((state) => state);
    const fileHandler = (e) => {
        setFile(e.target.files[0])
    }


    function handleSubmit(e) {
        e.preventDefault();

    }

    const onClick = () => setShowResults(true);

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

    return (
        <div>
            <span onClick={handleClickOpen}>
                {props.modal}
            </span>
            <Dialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.show}>
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>

                </DialogTitle>


                <DialogContent>
                    <div className="form_section" style={{padding: '0px 12px'}}>
                        <div className="formBox">
                            <form onSubmit={handleSubmit}>
                                <div className="row">

                                    <div className="col-sm-12 text-center">
                                        <p className="mb-0">
                                            <i style={{fontSize: '45px'}} class="fa fa-check-circle text-success"
                                               aria-hidden="true"></i>
                                        </p>
                                        <p style={{fontSize: '25px'}}>Success!</p>
                                        <p className="mb-0"
                                           style={{fontSize: '18px', color: 'blue'}}>{props.message}</p>
                                          {props.displayId?<strong>{props.displayId}</strong>:null} 
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>

                    <DialogActions>

                        <div className="row">
                            <div className="col-sm-12 text-center">
                                {/* <button style={redButton} onClick={handleClose}>{props.done}
                                </button>
                                    &nbsp; */}
                                <button onClick={props.handleClose} style={blackButton}>{props.cancel}</button>
                            </div>
                        </div>

                    </DialogActions>
                </DialogContent>

            </Dialog>
        </div>
    );
}
