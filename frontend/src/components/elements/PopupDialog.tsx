import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RssFeed {
  id?: string;
  name: string;
  url: string;
  active: boolean;
}

const PopupDialog = ({ open, handleClose, initialData, handleAdd, handleEdit }: {
  open: boolean,
  handleClose: () => void,

  initialData?: RssFeed | null,
  handleAdd: (data:  RssFeed) => void,
  handleEdit: (data: RssFeed) => void
}) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [active, setActive] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || '');
      setName(initialData.name || '');
      setUrl(initialData.url || '');
      setActive(initialData.active || false);
    }
  }, [initialData]);

  const handleAction = () => {
    if (initialData) {
      handleEdit({ name, url, active, id });
    } else {
      handleAdd({ name, url, active });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Edit Feed' : 'Add Feed'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {initialData ? 'Please update the feed:' : 'Please enter the feed:'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="URL"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <FormControlLabel
          control={
            <Switch
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              name="active"
              color="primary"
            />
          }
          label="Active"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAction} color="primary">
          {initialData ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupDialog;
