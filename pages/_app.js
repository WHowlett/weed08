import { ChakraProvider, Container } from "@chakra-ui/react";
import Auth from "../components/Auth";

function MyApp({ Component, pageProps }) {
return (
<ChakraProvider>
<Container maxW="7xl">
  <Auth/>
  </Container>
<Component {...pageProps} />
</ChakraProvider>
);
}
export default MyApp;