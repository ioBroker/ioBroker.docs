/**
 * Session handling of the app the header is used in.
 * The header component is identical in all ioBroker web apps - what "logout" does
 * is not, so every app provides its own implementation here.
 * The documentation front-end has no session of its own yet.
 */
export function logout(): void {
    console.log('logout');
}
