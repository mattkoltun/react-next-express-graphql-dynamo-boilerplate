import React from 'react';
import { Typography, Box, Link } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Main from 'components/Main';
import Head from 'next/head';
import CardButton from 'components/CardButton';
import { useRouter } from 'next/dist/client/router';
import { useAuth } from 'contexts/authProvider';

const useTechnologyLinks = () => [
  {
    name: 'React',
    href: 'https://reactjs.org/',
  },
  {
    name: 'Next',
    href: 'https://nextjs.org/',
  },
  {
    name: 'Express',
    href: 'https://expressjs.com/',
  },
  {
    name: 'GraphQL',
    href: 'https://graphql.org/',
  },
  {
    name: 'DynamoDB',
    href: 'https://aws.amazon.com/dynamodb/',
  },
];

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      padding: theme.spacing(2),
    },
  })
);

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles();
  const router = useRouter();
  const links = useTechnologyLinks();
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <>
      <Head>
        <title>Boiler Plate</title>
      </Head>

      <Main>
        {isAuthenticated && (
          <Typography variant="h2" align="center" color="textSecondary">
            Welcome back {user.firstName}!
          </Typography>
        )}
        {!isAuthenticated && (
          <Typography variant="h2" align="center" color="textSecondary">
            Webapp Boilerplate
          </Typography>
        )}

        <Box display="flex" justifyContent="center" width="100%">
          {links.map((link) => (
            <Typography key={link.name} className={classes.list} align="center">
              <Link href={link.href} target="_blank" rel="noopener">
                {link.name}
              </Link>
            </Typography>
          ))}
        </Box>

        <Typography align="center" variant="body2" color="textSecondary">
          created by Matt Koltun
        </Typography>
        <Box my={2} display="flex" justifyContent="center" width="100%">
          {isAuthenticated && (
            <>
              <CardButton buttonProps={{ onClick: () => router.push('/user') }}>
                <Typography variant="button">Profile</Typography>
              </CardButton>
              <CardButton buttonProps={{ onClick: logout }}>
                <Typography variant="button">Logout</Typography>
              </CardButton>
            </>
          )}
          {!isAuthenticated && (
            <>
              <CardButton buttonProps={{ onClick: () => router.push('/login') }}>
                <Typography variant="button">Login</Typography>
              </CardButton>
              <CardButton buttonProps={{ onClick: () => router.push('/register') }}>
                <Typography variant="button">Register</Typography>
              </CardButton>
            </>
          )}
        </Box>
      </Main>
    </>
  );
};

export default Home;
