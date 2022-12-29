import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { withTranslation, useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

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
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    padding: '25px',
    textAlign: 'center',
    width: '380px',
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    // margin: 0,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginTop: '20px',
    display: 'block',
  },
}))(MuiDialogActions)

export default function CreatePickup(props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const { t } = useTranslation()
  const FontChange = useSelector((state) => state.fontsizechanger.fontsizechanger);
  return (
    <>
      <button type='button' className='cancel' onClick={handleClickOpen} style={{fontSize: `${FontChange}px`}}>
        {props.modal}
      </button>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        ></DialogTitle>
        <DialogContent>
          <Typography>
            {/* Do you want to Discard the changes and skip shipment creation */}
            {t('modal.discardshipmet')}
          </Typography>
          <DialogActions>
            <div className='create_link'>
              <button onClick={handleClose} className='cancel'>
                {props.cancel}
              </button>
              <button className='create'>
                <Link className='text-white' to={props.url}>
                  {props.done}
                </Link>
              </button>
            </div>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
