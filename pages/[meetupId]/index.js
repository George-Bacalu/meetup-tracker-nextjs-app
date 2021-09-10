import React, { Fragment } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { MONGODB_DOMAIN } from "../../components/store/mongodb-domain";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetailsPage = (props) => {
  const { title, image, address, description } = props.meetupData;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail title={title} image={image} address={address} description={description} />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(MONGODB_DOMAIN);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // find (defined as a mongodb special function for performing CRUD operations) receives 2 arguments
  // the first one is an object which has a result the filtered values in the collection based on a certain criteria
  // the second one is an object where you can specify which specific keys for every object you want to fetch (here we're only fetching the ids)

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(MONGODB_DOMAIN);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  const { _id, title, image, address, description } = selectedMeetup;

  client.close();

  return { props: { meetupData: { id: _id.toString(), title, image, address, description } } };
};

export default MeetupDetailsPage;
