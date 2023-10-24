export function primaryEmailAddress(user: any): string {
  return user.emailAddresses.find(email => email.id === user.primaryEmailAddressId).emailAddress
}