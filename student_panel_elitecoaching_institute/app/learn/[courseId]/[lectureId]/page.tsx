import { LectureWorkspace } from "@/components/lecture-workspace";

export default async function LecturePage({ params }: { params: Promise<{ courseId: string; lectureId: string }> }) {
  const { courseId, lectureId } = await params;
  return <LectureWorkspace courseId={courseId} lectureId={lectureId} />;
}
