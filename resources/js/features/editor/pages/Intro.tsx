import React from 'react';
import { Button, Flex, Text, Title } from '@mantine/core';
import Link from '../../../components/Link/Link';

const Intro = (props: any) => {;
    return (
        <Flex align={"center"} direction={"column"} justify={"center"} h={"100%"}>
            <Title mb="md">Get Started!</Title>
            <Text mb={"md"}>Create now your first page</Text>
            <Button component={Link} href={"/get-started"} module='admin' method='post'>Start now</Button>
        </Flex>
    )
}


export default Intro;