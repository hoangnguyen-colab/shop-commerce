import type { GetStaticPropsContext } from 'next'
// import { Layout } from '@components/common';
import { Container, Text } from '@components/ui';
import withAuth from '@hocs/withAuth';

function Profile() {
  const  data  = null;
  return (
    <Container>
      <Text variant="pageHeading">My Profile</Text>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <Text variant="sectionHeading">Full Name</Text>
              <span>
                {/* {data.firstName} {data.lastName} */}
              </span>
            </div>
            <div className="mt-5">
              <Text variant="sectionHeading">Email</Text>
              {/* <span>{data.email}</span> */}
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

// Profile.Layout = Layout

export default withAuth(Profile);