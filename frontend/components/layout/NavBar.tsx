import React from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/slice/auth";
import Button from "./Button";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <nav className="bg-white border-b shadow mb-4">
      <div className="container m-auto p-3">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/">
              <a className="text-red-400 text-3xl text-uppercase">Record App</a>
            </Link>
          </div>
          <div>
            {auth.isAuthenticated ? (
              <>
                <Link href="/record/add">
                  <a className="btn btn-red-outline">Add Record</a>
                </Link>
                <Button
                  className="btn btn-red-outline ml-4"
                  text="Logout"
                  type="button"
                  loading={auth.isLoading}
                  onClick={() =>
                    dispatch(logoutUser(() => router.push("/login")))
                  }
                />
              </>
            ) : (
              <>
                <Link href="/register">
                  <a className="btn btn-blue-outline">Register</a>
                </Link>
                <Link href="/login">
                  <a className="btn btn-blue-outline ml-4">Login</a>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
