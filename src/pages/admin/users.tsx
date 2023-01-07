import { Body } from '../../layout/body';
import { CardGroup } from '../../components/shared/card/card-group';
import { fetchUsers } from '../../api/user/fetch-users';
import { useQuery } from 'react-query';
import { Card } from '../../components/shared/card/card';
import { Button } from '../../components/shared/button/button';
import { fetchUserRole } from '../../api/user/fetch-user-role';
import React from 'react';
import { Modal } from '../../components/shared/modal/modal';
import { ModalEditUser } from '../../components/shared/modal/modal-edit-user';
import { ModalAddUser } from '../../components/shared/modal/modal-add-user';

export const Users = () => {
  const usersQuery = useQuery('users', fetchUsers);
  const authQuery = useQuery('userRole', fetchUserRole);
  const users = usersQuery.data;
  const userId = authQuery.data.id;

  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState({});

  const handleDelete = () => {
    // TODO: delete user
  };
  const handleAdd = () => {
    // TODO: add user
  };
  const handleEdit = () => {

  };
  return (
    <Body>
      {
        editModalOpen && (

          <Modal
            title={'Edit user'}
            open={editModalOpen}
            onClose={() => {
              setEditModalOpen(false);
            }}>
            <ModalEditUser user={selectedUser} />
          </Modal>
        )
      }

      {
        addModalOpen && (
          <Modal
            title={'Add user'}
            open={addModalOpen}
            onClose={() => {
              setAddModalOpen(false);
            }}>
            <ModalAddUser />
          </Modal>
        )
      }


      <div className={'py-12 gap-x-5 flex justify-end'}>
        <Button onClick={() => setAddModalOpen(true)}>Add a new user</Button>
        <Button className={'bg-red-500 hover:bg-red-700'}>Delete selected users</Button>
      </div>
      <CardGroup className={'grid-rows-6 lg:!grid-cols-3'}>
        {
          users?.map((user: any) => {
            const canEdit = user.id === userId;
            return (
              <Card className={'row-span-3 '} key={user.id}>
                <div className={'h-full flex flex-col justify-between'}>
                  <input type={'checkbox'} disabled={canEdit} className={'w-fit'} />
                  <div className={'flex items-center justify-center'}>
                    <img className={'w-10 h-10 rounded-full'} src={'https://i.pravatar.cc/300'} alt={'Pajeet'} />
                  </div>
                  <div className={'flex flex-col items-center justify-center'}>
                    <div className={'text-xl font-bold'}>{user.first_name + ' ' + user.last_name}</div>
                    <div className={'text-sm'}>{user.contact.email}</div>
                  </div>
                  <div className={'pb-2 flex w-full'}>
                    <Button className={'bg-green-500 hover:bg-green-700 w-full'} disabled={canEdit} onClick={() => {
                      setSelectedUser(user);
                      setEditModalOpen(true);
                    }}>Edit</Button>

                  </div>
                </div>
              </Card>
            );

          })
        }

      </CardGroup>

    </Body>
  );
};
export default Users;