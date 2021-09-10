import React, { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { MONGODB_DOMAIN } from "../components/store/mongodb-domain";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetup Tracker NextJS</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  // fetch data from an API

  const client = await MongoClient.connect(MONGODB_DOMAIN);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const loadedMeetups = await meetupsCollection.find().toArray();
  const meetupsList = loadedMeetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
    description: meetup.description,
  }));

  client.close();

  return { props: { meetups: meetupsList }, revalidate: 1 };
};

/*
export const getServerSideProps = async (context) => {
  // fetch data from an API
  // const {req, res} = context;
  const req = context.req;
  const res = context.res;

  return { props: { meetups: meetupsData } };
};
*/

export default HomePage;
