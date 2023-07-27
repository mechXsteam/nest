import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const LightboxDisplay = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <VisibilityRoundedIcon onClick={() => setOpen(true)} cursor={'pointer'}/>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[
                    {src: props.picture1},
                    {src: props.picture2},
                    {src: props.picture3},
                    {src: props.picture4},
                ]}
            />
        </>
    );
};

export default LightboxDisplay;