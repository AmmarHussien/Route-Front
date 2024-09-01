import axios from "axios";

const URL = "https://route-service.app/dashboard-api/v1/";

export async function logout() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(
      `${URL}logout`,
      {},
      {
        headers: {
          ApiToken: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "logout failed due to an unexpected error"
    );
  }
}

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${URL}login`, {
      email: email,
      password: password,
    });

    if (response && response.data) {
      // Assuming the response contains a token
      const { access_token } = response.data.data;
      localStorage.setItem("authToken", access_token);

      // Redirect or update UI as needed

      return response.data;
    } else {
      throw new Error("Login failed: No response data");
    }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed due to an unexpected error"
    );
  }
}

export async function getCurrentUser() {
  const { data: session } = localStorage.getItem("authToken");

  if (!session.session) return null;

  const { data, error } = localStorage.getItem("authToken");

  if (error) throw new Error(error.message);

  return data?.user;
}

// export async function logout() {
//   const { error } = await supabase.auth.signOut();

//   if (error) throw new Error(error.message);
// }

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   // 1. update password or username

//   let updateData;

//   if (password) updateData = { password };

//   if (fullName)
//     updateData = {
//       data: {
//         fullName,
//       },
//     };

//   const { data, error } = await supabase.auth.updateUser(updateData);

//   if (error) throw new Error(error.message);

//   if (!avatar) return data;

//   // 2. uploud avatar image

//   const fileName = `avatar=${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   // 3. update avatar in the user

//   const { data: updatedUser, error: updatedError } =
//     await supabase.auth.updateUser({
//       data: {
//         avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//       },
//     });

//   if (updatedError) throw new Error(updatedError.message);

//   return updatedUser;
// }
