import { faker } from "@faker-js/faker";
import { DB } from "../lib/db";
import { DatabaseUser, Note, Tag } from "../store";

export const createFakeUsers = (count: number) => {

  const users: DatabaseUser[] = [];

  for (let i = 0; i < count; i++) {
    const uuid = faker.datatype.uuid();
    const user: DatabaseUser = {
      id: uuid,
      email: faker.internet.email(),
      password: faker.internet.password(),
      user: {
        id: uuid,
        createdAt: new Date().toISOString(),
        profile: {
          username: faker.internet.userName(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.avatar(),
          biography: faker.lorem.words(5),
          followers: [],
          following: [],
        }
      }
    };
    users.push(user);
  }

  // //add a couple of followers for each user
  // users.forEach(user => {
  //   const followers = users.filter(u => u.id !== user.id);
  //   const randomFollowers = faker.helpers.shuffle(followers).slice(0, 2);
  //   user.user.profile.followers = randomFollowers.map(f => f.user);

  //   //for each follower, add the user to their following list
  //   randomFollowers.forEach(follower => {
  //     follower.user.profile.following.push(user.user);
  //   })
  // });

  //add a couple of followers for each user
  users.forEach(user => {
    const followers = users.filter(u => u.id !== user.id);
    const randomFollowers = faker.helpers.shuffle(followers).slice(0, 2);
    user.user.profile.followers = randomFollowers.map(f => f.user.id);

    //for each follower, add the user to their following list
    randomFollowers.forEach(follower => {
      follower.user.profile.following.push(user.user.id);
    })
  });

  return users;
};

export const createFakeTags = (count: number, users: DatabaseUser[]) => {
  const tags: Tag[] = [];
  
  for (let i = 0; i < count; i++) {
    
    const pos = faker.datatype.number({max: users.length-1});
    const tag: Tag = {
      id: faker.datatype.uuid(),
      name: faker.random.word(),
      count: 0,
      createdAt: new Date().toISOString(),
      userId: users[pos].user.id,
    };
    tags.push(tag);
  }

  const tag = {
    id: faker.datatype.uuid(),
    name: "design",
    count: 0,
    createdAt: new Date().toISOString(),
    userId: users[0].id,
  }

  tags.push(tag);

  return tags;
};

export const createFakeNotes = (count: number, users: DatabaseUser[], tags: Tag[]) => {
  const notes: Note[] = [];
  
  for (let i = 0; i < count; i++) {

    const pos = faker.datatype.number({max: users.length-1});
    const pos2 = parseInt(faker.random.numeric(1, {bannedDigits: ['user']}));
    const pos3 = parseInt(faker.random.numeric(1, {bannedDigits: ['user']}));

    const note: Note = {
      id: faker.datatype.uuid(),
      title: faker.random.words(3),
      content: faker.lorem.paragraphs(3),
      tags: faker.helpers.shuffle(tags).slice(0, 2),
      likes: [users[pos2].user, users[pos3].user],
      forks: [],
      visibility: "public",
      author: users[pos].user,
      inlineLinks: [],
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    };
    notes.push(note);
  }

  const designTag = tags.find(t => t.name === "design"); 

  const note: Note = {
    id: faker.datatype.uuid(),
    title: "Designing a better app",
    content: faker.lorem.paragraphs(3),
    tags: [designTag? designTag : tags[0]],
    likes: [users[0].user, users[1].user],
    forks: [],
    visibility: "public",
    author: users[0].user,
    inlineLinks: [],
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
  };

  notes.push(note);

  return notes;
}