export const uuidValidation = (id: string) => {
  const regexUuid =
    /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;

  return id.match(regexUuid) ? true : false;
};
