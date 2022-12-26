import {Box, Image, Text, Button} from "@chakra-ui/react";

export const Header = () => {
    return (
        <Box w={1455} h={75} display='flex' bg="#04396D" justifyContent="space-between" alignItems="center">
            <Box position='relative'>
                <Image width='85px' display='inline'
                       height='58' mt='9px' ml='11px' src='src/assets/LOGO.png'
                />
                <Text alignSelf='end' mb='10px' mr='30px' _before={{
                    content: "'UX AIR'",
                    display: 'inline-block',
                    position: 'absolute',
                    left: '69px',
                    bottom: '15px',
                    color: 'white',
                    width: '55px',
                    fontWeight: 600
                }}></Text>
            </Box>
            <Button mr='15px' justifySelf='flex-end' fontSize='lx'>Главная страница</Button>
        </Box>
    )
}
