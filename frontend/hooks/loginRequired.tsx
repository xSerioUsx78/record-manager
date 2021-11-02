export const loginRequiredSSR = (ssr: any) => {
  return async (ctx: any) => {
    const state = ctx.req.__nextReduxWrapperStore.getState();
    if (!state.auth.isAuthenticated) {
      return {
        redirect: {
          status: 302,
          destination: '/login'
        }
      }
    };
    return await ssr(ctx); // Continue on to call `getServerSideProps` logic
  };
};