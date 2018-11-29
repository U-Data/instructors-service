ALTER TABLE instructors ADD COLUMN rating real;
ALTER TABLE instructors ADD COLUMN reviews integer;
ALTER TABLE instructors ADD COLUMN courses integer;

UPDATE instructors i
SET rating = calc_rating, reviews = num_reviews
, courses = num_courses
FROM (
SELECT inst_id
, ROUND((SUM(rating * reviews) / SUM(reviews))::numeric, 1) as calc_rating
, SUM(reviews) as num_reviews
, COUNT(*) as num_courses
FROM joins j JOIN courses c ON j.course_id = c.id
GROUP BY inst_id
) agg
WHERE i.id = agg.inst_id;