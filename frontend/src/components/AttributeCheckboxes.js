import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AttributeCheckboxes({ attrs }) {
    const checkboxes = attrs.map(
        (attr, idx) => 
        <FormControlLabel name={"check" + idx} key={idx} control={<Checkbox defaultChecked></Checkbox>} label={attr} value={attr}>
        </FormControlLabel>)
    return (
        <FormGroup>
            {checkboxes}
        </FormGroup>
    );
}