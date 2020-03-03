import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import Api from '../Api';
import Form from '../components/Form';
import Header from '../components/Header';

function CreateRoomPage() {
  const [redirect, setRedirect] = useState(false);
  const [unaccessibleRooms, setUnaccessibleRooms] = useState([]);

  const params = useParams();

  useEffect(() => {
    Api.get('rooms').then(({ rooms }) => {
      const filteredRooms = rooms.filter((room) => !(JSON.parse(room.users.replace('{', '[').replace('}', ']')).includes(params.userId)));
      setUnaccessibleRooms(filteredRooms);
    });
  }, [params.userId]);

  if (redirect) {
    return <Redirect to={`/messages/${params.userId}`} />;
  }

  console.log(unaccessibleRooms);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header>
        Create Room +
      </Header>
      <div className="body-section">
        <Form
          button="white"
          submitName="Create"
          onSubmit={({ input }) => {
            setRedirect(true);
            Api.post('rooms', { rid: v4(), name: input, users: [params.userId] });
          }}
        >
          Room Name
        </Form>
      </div>
      <div className="body-section">
        Join Existing Room...
        {unaccessibleRooms.map((x) => (
          <div
            onClick={() => {
              Api.post('roomAddPerson', { users: [...JSON.parse(x.users.replace('{', '[').replace('}', ']')), params.userId], rid: x.rid });
              setRedirect(true);
            }}
            className="bubble transition duration-500 ease-in-out hover:shadow-md"
          >
            {x.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateRoomPage;
