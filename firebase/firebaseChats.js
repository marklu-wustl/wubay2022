import {arrayUnion, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc,} from "firebase/firestore";
import {database} from "./firebase_config";

export async function getMessages(chatId) {
  const chatDocRef = doc(database, "chats", chatId);
  const chatDocSnap = await getDoc(chatDocRef);
  return chatDocSnap.data().messages;
}


export async function newMessage(chatId, myId, imgUrl, text) {

  const chatDocRef = doc(database, "chats", chatId);
  const chatDocSnap = await getDoc(chatDocRef);
  const theirId = chatDocSnap.data().UserIdA === myId ? chatDocSnap.data().UserIdB : chatDocSnap.data().UserIdA;

  const myDocRef = doc(database, "users", myId);
  const myDocSnap = await getDoc(myDocRef);
  if (!myDocSnap.exists()) {
    return myDocSnap.data();
  }

  const myName = myDocSnap.data().username;
  const myAvatar = myDocSnap.data().avatarUrl;

  console.log(myId, theirId, myName, myAvatar)

    await updateDoc(doc(database, "chats", chatId), {
      messages: arrayUnion({
        //id: uuid(),
        text,
        senderId: myId,
        senderName: myName,
        senderAvatar: myAvatar,
        date: Timestamp.now(),
        img: imgUrl,
      }),
    });




  await updateDoc(doc(database, "userChats", myId), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: serverTimestamp(),
  });

  await updateDoc(doc(database, "userChats", theirId), {
    [chatId + ".lastMessage"]: {
      text,
    },
    [chatId + ".date"]: serverTimestamp(),
  });

};


export async function newChat(myId, theirId) {
  const myDocRef = doc(database, "users", myId);
  const myDocSnap = await getDoc(myDocRef);
  if (!myDocSnap.exists()) {
    return false;
  }

  const theirDocRef = doc(database, "users", theirId);
  const theirDocSnap = await getDoc(theirDocRef);
  if (!theirDocSnap.exists()) {
    return false;
  }


  const combinedId =
    myId > theirId
      ? myId + theirId
      : theirId + myId;
  //console.log(combinedId);
  const res = await getDoc(doc(database, "chats", combinedId));
  const myUserChat = await getDoc(doc(database, "userChats", myId));
  if (!myUserChat.exists()) {
    await setDoc(doc(database, "userChats", myId), {});
  }
  const theirUserChat = await getDoc(doc(database, "userChats", theirId));
  if (!theirUserChat.exists()) {
    await setDoc(doc(database, "userChats", theirId), {});
  }

  if (!res.exists()) {
    //create a chat in chats collection
    await setDoc(doc(database, "chats", combinedId), {
      UserIdA: myId,
      UserIdB: theirId,
      messages: []
    });
    //const time = new Date();
    //create user chats
    await updateDoc(doc(database, "userChats", myId), {
      [combinedId + ".userInfo"]: {
        uid: theirId,
        displayName: theirDocSnap.data().username,
        photoURL: theirDocSnap.data().avatarUrl,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(database, "userChats", theirId), {
      [combinedId + ".userInfo"]: {
        uid: myId,
        displayName: myDocSnap.data().username,
        photoURL: myDocSnap.data().avatarUrl,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });
    // await updateDoc(doc(database, "users", myId), {
    //   usersChats: arrayUnion({
    //       id: combinedId,
    //       uid: theirId,
    //       displayName: theirDocSnap.data().username,
    //       photoURL: theirDocSnap.data().avatarUrl,
    //       date:  Timestamp.now(),
    //     }
    //   )
    // });
    //
    // await updateDoc(doc(database, "users", theirId), {
    //   usersChats: arrayUnion({
    //       id: combinedId,
    //       uid: myId,
    //       displayName: myDocSnap.data().username,
    //       photoURL: myDocSnap.data().avatarUrl,
    //       date:  Timestamp.now(),
    //     }
    //   )
    // });
  }
  return true;

}

