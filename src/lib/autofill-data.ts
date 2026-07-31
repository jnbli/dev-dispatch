export interface AutofillAnswer {
  question: string;
  type: string;
  options: string[];
  answer: string;
}

const RAW = `Are you at least 18 years of age?;yesno;Yes,No;Yes
Are you authorized to work in the United States for any employer?;yesno;Yes,No;Yes
Are you currently based in the United States?;yesno;Yes,No;Yes
Are you currently eligible to work in the United States of America?;yesno;Yes,No;Yes
Are you currently legally authorized to work in the US?;yesno;Yes,No;Yes
Are you legally authorized to work in the U.S.?;yesno;Yes,No;Yes
Current location;text;;Fremont, California, United States
Current Location;text;;Fremont, California, United States
Current/Most Recent Company Name;text;;Intel
Current/Most Recent Job Title;text;;Software Engineer
Do you have a college degree?;yesno;Yes,No;Yes
Do you have legal authorization to work in the US without company sponsorship?;yesno;Yes,No;Yes
Do you now or in the future require visa sponsorship to continue working in the United States?;yesno;Yes,No;No
Do you require visa sponsorship?;yesno;Yes,No;No
GitHub;text;;https://github.com/johndoe
GitHub URL;text;;https://github.com/johndoe
How did you hear about us?;location;;LinkedIn
How did you hear about us?;textarea;;search engine
Legal Full Name;text;;John Doe
LinkedIn link;text;;https://www.linkedin.com/in/johndoe
Linkedin profile;text;;https://www.linkedin.com/in/johndoe
LinkedIn Profile:;text;;https://www.linkedin.com/in/johndoe
LinkedIn  URL;text;;https://www.linkedin.com/in/johndoe
Location;text;;Fremont, California, United States
Preferred Last Name;text;;Doe
Where are you currently based?;location;;Fremont, California, United States
Why are you interested in this position?;textarea;;Strong technical and product fit for the role, and motivated to join a team I admire and enjoy working with.
Will you now or in the future require sponsorship for employment visa status in the United States?;yesno;Yes,No;No
Will you now or in the future require visa sponsorship for employment?;yesno;Yes,No;No
Will you now or in the future require visa sponsorship to work in the United States?;radio;Yes,No;No
Zip Code;text;;94539
Email Address;email;;johndoehq@gmail.com
Full name;text;;John Doe
How did you hear about this job?;location;;LinkedIn
Legal First and Last Name;text;;John Doe
Linkedin Profile URL;text;;https://www.linkedin.com/in/johndoe
What are your compensation expectations?;text;;
What is your desired compensation?;number;;
Will you now or in the future require sponsorship to work in the United States?;yesno;Yes,No;No
Will you now, or in the future, require sponsorship for employment visa status (e.g. H-1B visa status)?;yesno;Yes,No;No
Are you authorized to work lawfully in the United States?;yesno;Yes,No;Yes
Are you currently authorized to work in the United States?;yesno;Yes,No;Yes
Are you legally authorized to work in the US?;yesno;Yes,No;Yes
Education History;checkbox;;University of California, Davis
What are your salary expectations?;number;;150000
Are you legally authorized to work in the United States?;radio;Yes,No;Yes
Github;text;;https://github.com/johndoe
LinkedIn profile;text;;https://www.linkedin.com/in/johndoe
School;unknown;;University of California, Davis
What are your salary expectations?;text;;150000
Will you now or in the future require sponsorship to work in the US?;yesno;Yes,No;No
Where are you currently located?;location;;Fremont, California, United States
Are you authorized to work in the United States?;yesno;Yes,No;Yes
Full Legal Name;text;;John Doe
Preferred Name;text;;John Doe
Will you now or in the future require sponsorship for employment visa status (e.g., H-1B visa status)?;yesno;Yes,No;No
First and Last Name;text;;John Doe
Legal Name;text;;John Doe
Preferred First Name;text;;John
Where are you located?;location;;Fremont, California, United States
Are you legally authorized to work in the United States for any employer?;yesno;Yes,No;Yes
Last Name;text;;Doe
Linkedin URL;text;;https://www.linkedin.com/in/johndoe
Will you now or in the future require visa sponsorship to work in the United States?;yesno;Yes,No;No
Current Company;text;;Intel
First Name;text;;John
Will you now or in the future require sponsorship for employment visa status?;yesno;Yes,No;No
Will you now or in the future require visa sponsorship?;yesno;Yes,No;No
Linkedin;text;;https://www.linkedin.com/in/johndoe
Linkedin Profile;text;;https://www.linkedin.com/in/johndoe
LinkedIn Profile URL;text;;https://www.linkedin.com/in/johndoe
Resume;file;;
Current Location;location;;Fremont, California, United States
LinkedIn URL;text;;https://www.linkedin.com/in/johndoe
Are you legally authorized to work in the United States?;yesno;Yes,No;Yes
LinkedIn;text;;https://www.linkedin.com/in/johndoe
Full Name;text;;John Doe
LinkedIn Profile;text;;https://www.linkedin.com/in/johndoe
Location;location;;Fremont, California, United States
Name;text;;John Doe
Email;email;;johndoehq@gmail.com`;

export const AUTOFILL_ANSWERS: AutofillAnswer[] = RAW.split("\n").map((line) => {
  const [question, type, options, answer] = line.split(";");
  return {
    question: question ?? "",
    type: type ?? "",
    options: options ? options.split(",").filter(Boolean) : [],
    answer: answer ?? ""
  };
});
