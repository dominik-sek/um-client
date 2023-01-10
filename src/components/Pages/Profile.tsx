import {
    Avatar,
    AvatarBadge,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FormControl,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Wrap
} from '@chakra-ui/react'
import {useUserStore} from "../../../store";
import {EditIcon} from "@chakra-ui/icons";
import React from "react";
import {changeUserAvatar} from "../../api/change-user-avatar";
import {useQuery} from "react-query";
import {fetchUserProfile} from "../../api/fetch-user-profile";
import {FiDelete, FiSave} from "react-icons/all";

const Profile = () => {
    function iterateObject(obj: any) {
        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] === 'object') {
                    // property is an object, recursively call the function
                    iterateObject(obj[property]);
                } else {
                }
            }
        }
    }

    const {refetch: refetchProfile} = useQuery('fetchUserProfile', () => fetchUserProfile(), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const user = useUserStore(state => state.user);
    const setUser = useUserStore(state => state.setUser);
    const userAddress = user.address;
    const userContact = user.contact;
    const userFaculty = user.faculty;
    const userPersonal = user.personal;
    const userGradebook = user.gradebook;
    const [editBasicInfo, setEditBasicInfo] = React.useState(false);
    const [hasChanged, setHasChanged] = React.useState(false);
    let hasAvatar = false;
    let hasBackgroundPicture = false;
    
    if (user.account.account_images) {
        hasAvatar = user.account.account_images.avatar_url !== null;
        hasBackgroundPicture = user.account.account_images.background_url !== "";
    }
    const [avatarLink, setAvatarLink] = React.useState<string>(user.account.account_images?.avatar_url);
    const handleAvatarChange = async (file: File) => {
        // const getSignature = await fetchSignature().then((res)=>{
        //     return res
        // })
        const data = new FormData();
        data.append('file', file);
        // data.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
        // data.append('signature', getSignature.signature);
        // data.append('timestamp', getSignature.timestamp);
        data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        //upload to cloudinary
        fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                changeUserAvatar(data.secure_url)
                    .then((res) => {
                        setAvatarLink(data.secure_url)
                        refetchProfile()
                            .then((res) => {
                                setUser(res.data);
                            })

                    })
            })
    }

    return (

        <Flex
            w={'100%'}
            h={'100%'}
            direction={'column'}
        >
            <Stack spacing={8} flexDir={'column'} py={6} justify={'center'} align={'center'}>
                <Box
                    maxW={'80%'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded={'md'}
                    overflow={'hidden'}>
                    {hasBackgroundPicture ? (
                        <Image
                            h={'120px'}
                            w={'full'}
                            src={user.account.account_images.background_url}
                            objectFit={'cover'}
                        />
                    ) : (
                        <Stack
                            h={'120px'}
                            w={'full'}
                        >

                        </Stack>
                    )}
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size={'xl'}
                            src={
                                hasAvatar ? avatarLink : ''
                            }

                        >
                            <AvatarBadge
                                boxSize={'1em'}
                                bg={'transparent'}
                                borderColor={'transparent'}
                                cursor={'pointer'}

                            >
                                <FormControl>
                                    <label htmlFor="avatar-upload">
                                        <EditIcon cursor={'pointer'} boxSize={6}/>
                                    </label>
                                    <input id={'avatar-upload'}
                                           accept="image/*"
                                           type={'file'}
                                           style={{display: 'none'}}
                                           onChange={(e) => {
                                               if (e.target.files) {
                                                   handleAvatarChange(e.target.files[0])
                                               }
                                           }
                                           }
                                    />
                                </FormControl>
                            </AvatarBadge>

                        </Avatar>
                    </Flex>

                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Text fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
                                {user.first_name + ' ' + user.last_name}
                            </Text>
                            <Text fontSize={'sm'} color={'gray.500'}>
                                {user.role}
                            </Text>

                        </Stack>


                    </Box>
                </Box>


                <Box
                    maxW={'80%'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Card

                    >
                        <CardHeader w={'100%'} display={'flex'} justifyContent={'space-between'}>
                            <Heading size={'md'}>Basic Information</Heading>
                            <EditIcon cursor={'pointer'} boxSize={6} onClick={() => setEditBasicInfo(!editBasicInfo)}/>
                        </CardHeader>
                        <CardBody
                            display={'flex'}
                            gap={4}

                        >
                            <Stack
                                spacing={4}
                                maxW={'50%'}>
                                {
                                    Object.entries(userAddress).map(([key, value]) => {
                                        if (key !== 'person_id') {
                                            return (
                                                <Wrap
                                                    spacing={2}
                                                    key={key}
                                                >
                                                    <Text fontSize={'sm'}>{key}</Text>
                                                    <Input type={'text'} defaultValue={value} onChange={(e) => {
                                                        userAddress[key] = e.target.value;
                                                        setHasChanged(true)
                                                    }
                                                    }
                                                           isDisabled={!editBasicInfo}/>
                                                </Wrap>
                                            )
                                        }
                                    })
                                }
                            </Stack>
                            <Stack
                                spacing={4}
                                maxW={'50%'}>

                                {
                                    Object.entries(userContact).map(([key, value]) => {
                                        if (key !== 'person_id') {
                                            return (
                                                <Wrap
                                                    spacing={2}
                                                    key={key}
                                                >
                                                    <Text fontSize={'sm'}>{key}</Text>
                                                    <Input type={'text'} defaultValue={value} onChange={(e) => {
                                                        userContact[key] = e.target.value;
                                                        setHasChanged(true)
                                                    }
                                                    }
                                                           isDisabled={!editBasicInfo}/>
                                                </Wrap>
                                            )
                                        }
                                    })
                                }

                            </Stack>

                        </CardBody>
                        <ButtonGroup
                            display={'flex'}
                            justifyContent={'flex-end'}
                            w={'100%'}
                            p={4}

                        >
                            <Button leftIcon={<FiSave/>} minW={'25%'} colorScheme={'blue'}
                                    disabled={!hasChanged}>Save</Button>
                            <Button leftIcon={<FiDelete/>} minW={'25%'} colorScheme={'red'}>Discard</Button>
                        </ButtonGroup>
                    </Card>
                </Box>
            </Stack>

        </Flex>
    )
}
export default Profile;