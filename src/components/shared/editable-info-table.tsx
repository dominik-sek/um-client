import {Box, Input, Text, Wrap} from "@chakra-ui/react";
import React from "react";

interface EditableInfoProps {
    editable: boolean;
    obj: Object | Object[] | any;
}

const EditableInfoTable = ({obj, editable}: EditableInfoProps): JSX.Element => {
    return (
        <Wrap spacing={4} key={obj} w={'100%'} h={'100%'}>
            {
                Object.keys(obj).map((key) => {
                    if (typeof obj[key] === 'object') {
                        return EditableInfoTable({obj: obj[key], editable: editable});
                    } else {
                        if (key === 'id' || key === 'user_id' || key === 'account_id' || key === 'person_id') {
                            return null;
                        }
                        return (
                            <Box key={`${obj[key] + key}`}>
                                <Text>{key}</Text>
                                <Input value={obj[key]} onChange={(e) => {
                                    obj[key] = e.target.value;
                                }} isDisabled={editable}/>
                            </Box>
                        )
                    }
                })
            }
        </Wrap>
    )


}
export default EditableInfoTable;