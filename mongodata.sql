\c inst;

select
c.id
, c.course_name
, c.rating
, c.reviews
, c.lectures
, c.num_hours
, c.full_price
, c.disc_price
, c.photo_url
, array_to_json(array_agg(i.*)) as instructors
from courses c join joins j on c.id = j.course_id join instructors i on j.inst_id = i.id
group by
c.id
, c.course_name
, c.rating
, c.reviews
, c.lectures
, c.num_hours
, c.full_price
, c.disc_price
, c.photo_url
;