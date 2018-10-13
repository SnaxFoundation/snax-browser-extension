export function isMessageValid(mayBeMsg) {
  return mayBeMsg && typeof mayBeMsg.id === 'string' && typeof mayBeMsg.requestBody === 'object' && typeof mayBeMsg.responseBody === 'object' && typeof mayBeMsg.type === 'string';
}