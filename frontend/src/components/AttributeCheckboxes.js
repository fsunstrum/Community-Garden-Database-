import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AttributeCheckboxes({ attrs }) {
    console.log(attrs);
    const checkboxes = attrs.map((attr) => <FormControlLabel key={attr} control={<Checkbox defaultChecked></Checkbox>} label={attr}></FormControlLabel>)
    return (
        <FormGroup>
            {checkboxes}
        </FormGroup>
    );
}